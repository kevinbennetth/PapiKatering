const express = require("express");
const res = require("express/lib/response");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { merchant_id, q, categories, min_price, max_price, page, limit } =
    req.query;
  let columns =
    "packet.packetid, packet.packetname, packet.packetimage, packet.packetprice, merchant.merchantname, AVG(reviewrating) AS rating, COUNT(reviewrating) AS reviewcount";

  let dataSources =
    "FROM packet JOIN review ON packet.packetid = review.packetid JOIN merchant ON packet.merchantid = merchant.merchantid";

  let grouping =
    "GROUP BY packet.packetid, packet.packetname, packet.packetimage, packet.packetprice, merchant.merchantname";

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

  if (merchant_id) {
    conditions += ` AND packet.merchantid=$${idx}`;
    values.push(merchant_id);
    idx++;
  }

  if (q) {
    conditions += ` AND packetname=$${idx}`;
    values.push(q);
    idx++;
  }

  if (min_price) {
    conditions += ` AND packetprice >= $${idx}`;
    values.push(min_price);
    idx++;
  }

  if (max_price) {
    conditions += ` AND packetprice <= $${idx}`;
    values.push(max_price);
    idx++;
  }

  const enteredPage = page ? page : 1;
  const enteredLimit = limit ? limit : 25;
  const offset = (enteredPage - 1) * enteredLimit;

  const limitOffset = ` LIMIT $${idx} OFFSET $${idx + 1}`;

  values.push(enteredLimit);
  values.push(offset);

  const queryString = `SELECT ${columns} ${dataSources} ${conditions} ${grouping} ${limitOffset}`;

  try {
    const allPacket = await pool.query(queryString, values);

    res.status(400).json(allPacket.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  let queryString, values, newPacket;

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
      values = [newPacket.packetid, menus[index].menu_day];

      const resMenu = await pool.query(menuQueryString, values);
      newMenu = resMenu.rows[0];
      for (let i = 0; i < menus.length; i++) {
        const menuItemValues = createMenuItem(
          newMenu.menuid,
          menus[index]["menu_item"],
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
  const { merchant_data } = req.query;

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
      menu.menuitem = resMenuItem.rows[0];
      packetData.menu.push(menu);
    }

    res.status(400).json(packetData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = `DELETE FROM packet WHERE packetid = $1;`;
  const values = [id];

  try {
    await pool.query(queryString, values);
    res.json({ message: `Succesfully deleted packet with ID ${id}` });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { packetName, packetImage, packetPrice, packetDescription } = req.body;

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
      menu.menuitem = resMenuItem.rows[0];
      packetData.menu.push(menu);
    }

    res.json(packetData);
  } catch (error) {
    res.json(error.message);
  }
});

const createPacket = (req) => {
  const {
    merchant_id,
    packet_name,
    packet_image,
    packet_price,
    packet_description,
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
    merchant_id,
    packet_name,
    packet_image,
    packet_price,
    packet_description,
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
  const { menus } = req.body;
  const menuQueryString = `INSERT INTO menu (packetid, menuday) VALUES ($1, $2) RETURNING *;`;
  const menuItemQueryString = `INSERT INTO menuitem (menuid, menutime, menuname, menuimage, MenuDescription) VALUES ($1, $2, $3, $4, $5);`;

  return [menuQueryString, menuItemQueryString, menus];
};

const createMenuItem = (menuID, menuItem, index) => {
  const { menu_time, menu_name, menu_image, menu_description } =
    menuItem[index];
  return [menuID, menu_time, menu_name, menu_image, menu_description];
};

module.exports = router;
