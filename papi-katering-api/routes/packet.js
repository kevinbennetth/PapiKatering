const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { merchantID, q, categories, minPrice, maxPrice, page, limit } = req.query;
  let columns =
    "packet.packetid, packet.packetname, packet.packetimage, packet.packetprice, merchant.merchantname";

  let dataSources =
    "FROM packet JOIN merchant ON packet.merchantid = merchant.merchantid";

  let conditions = "WHERE";

  let values = [];

  let idx = 1;

  if (categories) {
    numberCategories = categories
      .split(",")
      .map((category) => parseInt(category));

    let categoryFormat = "";

    numberCategories.forEach(() => {
      if (idx == 1) categoryFormat += `$${idx}`;
      else categoryFormat += `, $${idx}`;
      idx++;
    });

    dataSources += ` JOIN packetcategory ON packet.packetid = packetcategory.packetid`;

    conditions += ` categoryid IN (${categoryFormat})`;
    values = [...numberCategories];
  }

  if (merchantID) {
    conditions += ` AND packet.merchantid=$${idx}`;
    values.push(merchantID);
    idx++;
  }

  if (q) {
    conditions += ` AND packetname=$${idx}`;
    values.push(q);
    idx++;
  }

  if (minPrice) {
    conditions += ` AND packetprice >= $${idx}`;
    values.push(minPrice);
    idx++;
  }

  if (maxPrice) {
    conditions += ` AND packetprice <= $${idx}`;
    values.push(maxPrice);
    idx++;
  }

  const enteredPage = page ? page : 1;
  const enteredLimit = limit ? limit : 25;
  const offset = (enteredPage - 1) * enteredLimit;

  const limitOffset = ` LIMIT $${idx} OFFSET $${idx + 1}`;

  values.push(enteredLimit);
  values.push(offset);

  const queryString = `SELECT ${columns} ${dataSources} ${
    conditions === "WHERE" ? "" : conditions
  } ${limitOffset}`;

  const reviewQueryString = `
    SELECT
      packetid,
      AVG(reviewrating) AS rating, 
      COUNT(reviewrating) AS reviewcount
    FROM review
    WHERE packetid=$1
    GROUP BY packetid;
    `;

  try {
    const resPacket = await pool.query(queryString, values);
    const allPacket = resPacket.rows;
    for (let i = 0; i < allPacket.length; i++) {
      const packet = allPacket[i];

      const reviewValues = [packet.packetid];
      const resReview = await pool.query(reviewQueryString, reviewValues);

      allPacket[i].rating = 0;
      allPacket[i].reviewCount = 0;

      if (resReview.rowCount > 0) {
        allPacket[i].rating = resReview.rows[0].rating;
        allPacket[i].reviewCount = resReview.rows[0].reviewCount;
      }
    }
    res.status(400).json(allPacket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  let queryString, values, newPacket, menuQueryString;

  [queryString, values] = createPacket(req);
  try {
    const resPacket = await pool.query(queryString, values);
    newPacket = resPacket.rows[0];

    [queryString, values] = createPacketCategories(req, newPacket.packetid);

    for (let index = 0; index < values.length; index++) {
      await pool.query(queryString, values[index]);
    }

    [menuQueryString, menuItemQueryString, menus] = createMenus(req);

    for (let index = 0; index < menus.length; index++) {
      values = [newPacket.packetid, menus[index].menuDay];

      const resMenu = await pool.query(menuQueryString, values);
      newMenu = resMenu.rows[0];
      for (let i = 0; i < menus.length; i++) {
        const menuItemValues = createMenuItem(
          newMenu.menuid,
          menus[index].menuItem,
          i
        );

        await pool.query(menuItemQueryString, menuItemValues);
      }
    }

    res.status(400).json({ message: "successfully added new packet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { merchantData } = req.query;

  const packetQueryString = "SELECT * FROM packet";

  const categoryQueryString = `
    SELECT
      c.categoryid,
      c.categoryname
    FROM packetcategory pc JOIN category c ON pc.categoryid = c.categoryid
    WHERE pc.packetid = $1
  `;
  const categoryValue = [id];

  const menuQueryString =
    "SELECT menuid, menuday FROM menu WHERE packetid = $1;";
  const menuValue = [id];

  const menuItemQueryString = `
    SELECT 
      menuitemid, 
      menutime, 
      menuname, 
      menuimage, 
      menudescription 
    FROM menuitem WHERE menuid = $1`;

  const merchantQueryString = `
    SELECT
      merchantid,
      merchantimage,
      merchantname,
      merchantaddress,
      merchantphone
    FROM merchant
    WHERE merchantid = $1;
  `;

  try {
    const resPacket = await pool.query(packetQueryString);
    const packetData = resPacket.rows[0];

    const resCategory = await pool.query(categoryQueryString, categoryValue);
    packetData.categories = resCategory.rows;

    const resMenu = await pool.query(menuQueryString, menuValue);
    packetData.menu = [];

    for (let i = 0; i < resMenu.rowCount; i++) {
      const menu = resMenu.rows[i];
      const resMenuItem = await pool.query(menuItemQueryString, [menu.menuid]);
      menu.menuItem = resMenuItem.rows;
      packetData.menu.push(menu);
    }

    const merchantID = packetData.merchantid;
    delete packetData.merchantid;

    if (merchantData === "true") {
      const merchantValue = [merchantID];
      const resMerchant = await pool.query(merchantQueryString, merchantValue);

      packetData.merchant = resMerchant.rows[0];
    }

    res.status(400).json(packetData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = `DELETE FROM packet WHERE packetid = $1 RETURNING *;`;
  const values = [id];

  try {
    const data = await pool.query(queryString, values);
    if (data.length > 0) {
      res.json({ message: `Succesfully deleted packet with ID ${id}` });
    } else {
      res.json({ message: `There's no packet with ID ${id}` });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { packetName, packetImage, packetPrice, packetDescription } = req.body;

  const packetQueryString = `
    UPDATE packet
    SET
      packetname=$1,
      packetimage=$2,
      packetprice=$3,
      packetdescription=$4
    WHERE packetid=$5;
  `;

  const packetValues = [
    packetName,
    packetImage,
    packetPrice,
    packetDescription,
    id,
  ];

  const menus = req.body.menu;
  const menuUpdateString = `
    UPDATE menu
    SET
      menuday=$1
    WHERE menuid=$2;
  `;

  const menuInsertString = `
    INSERT INTO menu(packetid, menuday) VALUES ($1, $2) RETURNING menuid;
  `;

  const menuItemUpdateString = `
    UPDATE menuitem
    SET
      menutime=$1,
      menuname=$2,
      menuimage=$3,
      menudescription=$4
    WHERE menuitemid=$5;
  `;

  const menuItemInsertString = `
    INSERT INTO menuitem(menuid, menutime, menuname, menuimage, menudescription) VALUES ($1, $2, $3, $4, $5);
  `;

  const { categories } = req.body;
  const packetCategoryDeleteString = `
    DELETE FROM packetcategory WHERE packetid=$1;
  `;

  const packetCategoryInsertString = `
    INSERT INTO packetcategory VALUES ($1, $2);
  `;

  const packetCategoryDeleteValues = [id];

  try {
    await pool.query(packetQueryString, packetValues);

    for (let i = 0; i < menus.length; i++) {
      menu = menus[i];
      if (menu.menuID) {
        const menuValues = [menu.menuDay, menu.menuID];
        await pool.query(menuUpdateString, menuValues);
      } else {
        const menuValues = [id, menu.menuDay];
        const resNewMenu = await pool.query(menuInsertString, menuValues);
        menu.menuid = resNewMenu.rows[0].menuid;
      }

      for (let i = 0; i < menu.menuItem.length; i++) {
        const menuItem = menu.menuItem[i];

        if (menuItem.menuItemID) {
          const menuItemValues = [
            menuItem.menuTime,
            menuItem.menuName,
            menuItem.menuImage,
            menuItem.menuDescription,
            menuItem.menuItemID,
          ];
          await pool.query(menuItemUpdateString, menuItemValues);
        } else {
          const menuItemValues = [
            menu.menuid,
            menuItem.menuTime,
            menuItem.menuName,
            menuItem.menuImage,
            menuItem.menuDescription,
          ];
          await pool.query(menuItemInsertString, menuItemValues);
        }
      }
    }

    await pool.query(packetCategoryDeleteString, packetCategoryDeleteValues);

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      const packetCategoryInsertValueString = [id, category];

      await pool.query(
        packetCategoryInsertString,
        packetCategoryInsertValueString
      );
    }
    res.status(400).json({ message: "successfully updated data !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createPacket = (req) => {
  const {
    merchantID,
    packetName,
    packetImage,
    packetPrice,
    packetDescription,
  } = req.body;

  const queryString = `
    INSERT INTO 
    packet 
    (merchantid, 
      packetname, 
      packetimage, 
      packetprice, 
      packetdescription) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  const values = [
    merchantID,
    packetName,
    packetImage,
    packetPrice,
    packetDescription,
  ];

  return [queryString, values];
};

const createPacketCategories = (req, packetID) => {
  const { categories } = req.body;
  const queryString = `INSERT INTO PacketCategory VALUES ($1, $2)`;

  const values = categories.map((category) => [packetID, category]);

  return [queryString, values];
};

const createMenus = (req) => {
  const { menu } = req.body;
  const menuQueryString = `INSERT INTO menu (packetid, menuday) VALUES ($1, $2) RETURNING *;`;
  const menuItemQueryString = `INSERT INTO menuitem (menuid, menutime, menuname, menuimage, MenuDescription) VALUES ($1, $2, $3, $4, $5);`;

  return [menuQueryString, menuItemQueryString, menu];
};

const createMenuItem = (menuID, menuItem, index) => {
  const { menuTime, menuName, menuImage, menuDescription } = menuItem[index];
  return [menuID, menuTime, menuName, menuImage, menuDescription];
};

module.exports = router;