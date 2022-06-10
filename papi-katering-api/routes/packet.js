const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { q, halal, vegetarian, minPrice, maxPrice, page, limit } = req.query;

  const inData = [];
  const notInData = [];
  const values = [];

  let valueCounter = 1;

  if (parseInt(vegetarian) === 1) {
    inData.push(1);
  } else if (parseInt(vegetarian) === -1) {
    notInData.push(1);
  }

  if (parseInt(halal) === 1) {
    inData.push(2);
  } else if (parseInt(halal) === -1) {
    notInData.push(2);
  }

  let categoryCondition = "";
  if (notInData.length === 2) {
    categoryCondition += " AND pc.categoryid IS NULL";
  } else {
    if (inData.length > 0) {
      categoryCondition += " AND pc.categoryid IN (";
      inData.forEach((indata, idx) => {
        if (idx > 0) categoryCondition += ", ";
        categoryCondition += indata;
      });
      categoryCondition += ")";
    }

    if (notInData.length > 0) {
      categoryCondition += " AND pc.categoryid NOT IN (";
      notInData.forEach((notindata, idx) => {
        if (idx > 0) condition += ", ";
        categoryCondition += notindata;
      });
      categoryCondition += ")";
    }
  }

  if (minPrice !== "") {
    categoryCondition += ` AND p.packetprice > ${valueCounter}`;
    values.push(minPrice);
    valueCounter++;
  }

  if (maxPrice !== "") {
    categoryCondition += ` AND p.packetprice < ${valueCounter}`;
    values.push(maxPrice);
    valueCounter++;
  }

  const enteredPage = page ? page : 1;
  const enteredLimit = limit ? limit : 20;
  const offset = (enteredPage - 1) * enteredLimit;

  const offsetString = `LIMIT $${valueCounter} OFFSET $${valueCounter + 1}`;
  values.push(parseInt(enteredLimit));
  values.push(offset);

  const query = `
    SELECT
      p.packetid,
      p.packetname, 
      p.packetimage, 
      p.packetprice, 
      m.merchantname,
      AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM packet p LEFT JOIN review r ON p.packetid = r.packetid
        JOIN merchant AS m ON p.merchantid = m.merchantid
        LEFT JOIN packetcategory pc ON p.packetid = pc.packetid
    WHERE p.packetname ILIKE '%${q}%' ${categoryCondition}
    GROUP BY 
      p.packetid,
      p.packetname, 
      p.packetimage, 
      p.packetprice, 
      m.merchantname
    ORDER BY reviewaverage ASC
    ${offsetString};
  `;

  const countQuery = `
    SELECT
      COUNT(p.packetid) AS totalrowcount
    FROM packet p LEFT JOIN review r ON p.packetid = r.packetid
        JOIN merchant AS m ON p.merchantid = m.merchantid
        LEFT JOIN packetcategory pc ON p.packetid = pc.packetid
    WHERE p.packetname ILIKE '%${q}%' ${categoryCondition}
  `;

  try {
    const results = await pool.query(query, values);
    let packets = processEmptyAverageReview(results.rows);

    const rowCountResult = await pool.query(countQuery);
    let page = parseInt(rowCountResult.rows[0].totalrowcount / limit) + 1;

    res.json({ data: packets, page });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/home", async (req, res) => {
  const query = `
  SELECT
    p.packetid,
    p.packetname, 
    p.packetimage, 
    p.packetprice, 
    m.merchantname,
    AVG(reviewrating)::numeric(10,1) as reviewaverage
  FROM packet p LEFT JOIN review r ON p.packetid = r.packetid
      JOIN merchant AS m ON p.merchantid = m.merchantid
  GROUP BY 
    p.packetid,
    p.packetname, 
    p.packetimage, 
    p.packetprice, 
    m.merchantname
  ORDER BY reviewaverage ASC
  LIMIT 8;
  `;

  try {
    const results = await pool.query(query);

    let packets = processEmptyAverageReview(results.rows);

    res.status(200).json({
      status: "success",
      data: {
        packetData: packets,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/recommend/:id", async (req, res) => {
  const { id } = req.params;
  const preferenceQuery = `
    SELECT * FROM preference WHERE customerid = $1;
  `;

  const preferenceValue = [id];

  try {
    const preferenceResponse = await pool.query(
      preferenceQuery,
      preferenceValue
    );
    const preference = preferenceResponse.rows[0];

    // 1 = vegetarian, 2 = halal

    const inData = [];
    const notInData = [];

    if (preference.vegetarian === 1) {
      inData.push(1);
    } else if (preference.vegetarian === -1) {
      notInData.push(1);
    }

    if (preference.halal === 1) {
      inData.push(2);
    } else if (preference.halal === -1) {
      notInData.push(2);
    }

    let categoryCondition = "WHERE";
    if (notInData.length === 2) {
      categoryCondition += " pc.categoryid IS NULL";
    } else {
      if (inData.length > 0) {
        categoryCondition += " pc.categoryid IN (";
        inData.forEach((indata, idx) => {
          if (idx > 0) condition += ", ";
          categoryCondition += indata;
        });
        categoryCondition += ")";
      }

      if (inData.length > 0 && notInData.length > 0) {
        categoryCondition += " AND";
      }

      if (notInData.length > 0) {
        condition += " categoryid NOT IN (";
        notInData.forEach((notindata, idx) => {
          if (idx > 0) condition += ", ";
          condition += notindata;
        });
        condition += ")";
      }
    }
    if (inData.length > 0 && notInData.length > 0) {
      condition += " AND";
    }
    if (preference.minPrice !== "") {
      categoryCondition += ` AND p.packetprice > $1`;
    }

    if (preference.maxPrice !== "") {
      categoryCondition += ` AND p.packetprice < $2`;
    }

    const query = `
    SELECT
        p.packetid,
        p.packetname, 
        p.packetimage, 
        p.packetprice, 
        m.merchantname,
        pc.categoryid,
        x.categorycount,
        AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM packet p JOIN merchant m ON p.merchantid = m.merchantid
        LEFT JOIN review r ON p.packetid = r.packetid
        LEFT JOIN packetcategory pc ON p.packetid = pc.packetid
        LEFT JOIN (
            SELECT
                packetid,
                COUNT(categoryid) AS categorycount
            FROM packetcategory
            GROUP BY packetid
        ) AS x ON pc.packetid = x.packetid
    ${categoryCondition}
    GROUP BY 
        p.packetid,
        p.packetname, 
        p.packetimage, 
        p.packetprice, 
        m.merchantname,
        pc.categoryid,
        x.categorycount
    ORDER BY reviewaverage ASC
    LIMIT 8;
    `;

    const response = await pool.query(query, [
      preference.minprice,
      preference.maxprice,
    ]);

    const data = processEmptyAverageReview(response.rows);

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
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
      values = [newPacket.packetid, menus[index].menuday];

      const resMenu = await pool.query(menuQueryString, values);
      newMenu = resMenu.rows[0];
      for (let i = 0; i < menus.length; i++) {
        const menuItemValues = createMenuItem(
          newMenu.menuid,
          menus[index].menuitems,
          i
        );

        await pool.query(menuItemQueryString, menuItemValues);
      }
    }

    res.status(200).json({ message: "successfully added new packet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { merchantData } = req.query;

  const packetQueryString = `
    SELECT
      p.packetid,
      p.packetname, 
      p.packetimage, 
      p.packetprice, 
      m.merchantid,
      AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM packet p LEFT JOIN review r ON p.packetid = r.packetid
      JOIN merchant m ON p.merchantid = m.merchantid
    WHERE p.packetid = $1
    GROUP BY
      p.packetid,
      p.packetname, 
      p.packetimage, 
      p.packetprice,
      m.merchantid;
    `;
  const packetValue = [parseInt(id)];

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

  const transactionCountQuery = `
    SELECT
      COUNT(*)
    FROM orders
    WHERE packetid = $1;
  `;

  const merchantReviewCountQuery = `
    SELECT
      AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM review AS r JOIN packet AS p ON r.packetid = p.packetid
      JOIN merchant AS m ON p.merchantid = m.merchantid
    WHERE m.merchantid = $1;
  `;

  const reviewDataQuery = `
    SELECT
      COUNT(*) AS reviewcount
    FROM review
    WHERE packetid = $1;
  `;

  const reviewQuery = `
    SELECT
      r.reviewid,
      c.customerid,
      c.customerimage,
      c.customername,
      r.reviewdate,
      r.reviewrating,
      r.reviewdescription
    FROM review AS r JOIN customer AS c ON r.customerid = c.customerid
    WHERE r.packetid = $1
    ORDER BY r.reviewdate DESC;

  `;

  try {
    const resPacket = await pool.query(packetQueryString, packetValue);
    let packetData = resPacket.rows[0];
    packetData = {
      ...packetData,
      reviewaverage:
        packetData.reviewaverage === null ? "0.0" : packetData.reviewaverage,
    };

    const resCategory = await pool.query(categoryQueryString, categoryValue);
    packetData.category = resCategory.rows;

    const resMenu = await pool.query(menuQueryString, menuValue);
    packetData.menu = [];

    for (let i = 0; i < resMenu.rowCount; i++) {
      const menu = resMenu.rows[i];
      const resMenuItem = await pool.query(menuItemQueryString, [menu.menuid]);
      menu.menuitems = resMenuItem.rows;
      packetData.menu.push(menu);
    }

    const merchantID = packetData.merchantid;
    delete packetData.merchantid;

    if (merchantData === "true") {
      const merchantValue = [merchantID];
      const resMerchant = await pool.query(merchantQueryString, merchantValue);

      packetData.merchant = resMerchant.rows[0];

      const resMerchantReview = await pool.query(
        merchantReviewCountQuery,
        merchantValue
      );

      packetData.merchant.reviewaverage =
        resMerchantReview.rows[0].reviewaverage === null
          ? "0.0"
          : resMerchantReview.rows[0].reviewaverage;

      const transactionCountValue = [packetData.packetid];
      const resTransactionCount = await pool.query(
        transactionCountQuery,
        transactionCountValue
      );

      packetData.transactioncount = resTransactionCount.rows[0].count;
      const reviewDataValue = [packetData.packetid];

      const resReview = await pool.query(reviewQuery, reviewDataValue);
      packetData.review = resReview.rows;

      const resReviewData = await pool.query(reviewDataQuery, reviewDataValue);
      packetData.reviewcount = resReviewData.rows[0].reviewcount;
    }

    res.status(200).json(packetData);
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
    merchantid,
    packetname,
    packetimage,
    packetprice,
    packetdescription,
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
    merchantid,
    packetname,
    packetimage,
    packetprice,
    packetdescription,
  ];

  return [queryString, values];
};

const createPacketCategories = (req, packetID) => {
  const { category } = req.body;
  const queryString = `INSERT INTO PacketCategory VALUES ($1, $2)`;

  const values = category.map((category) => [packetID, category]);

  return [queryString, values];
};

const createMenus = (req) => {
  const { menu } = req.body;
  const menuQueryString = `INSERT INTO menu (packetid, menuday) VALUES ($1, $2) RETURNING *;`;
  const menuItemQueryString = `INSERT INTO menuitem (menuid, menutime, menuname, menuimage, MenuDescription) VALUES ($1, $2, $3, $4, $5);`;

  return [menuQueryString, menuItemQueryString, menu];
};

const createMenuItem = (menuID, menuItem, index) => {
  const { menutime, menuname, menuimage, menudescription } = menuItem[index];
  return [menuID, menutime, menuname, menuimage, menudescription];
};

const processEmptyAverageReview = (data) => {
  return data.map((data) =>
    data.reviewaverage === null ? { ...data, reviewaverage: "0.0" } : data
  );
};

module.exports = router;
