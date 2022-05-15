const express = require("express");
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

  console.log(queryString);

  try {
    const allPacket = await pool.query(queryString, values);

    // const responseAllPacket = allPacket.map((packet) => {});

    res.status(400).json(allPacket.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
