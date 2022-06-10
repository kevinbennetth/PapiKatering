const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { q, page, limit } = req.query;

  const values = [];

  let valueCounter = 1;

  const enteredPage = page ? page : 1;
  const enteredLimit = limit ? limit : 20;
  const offset = (enteredPage - 1) * enteredLimit;

  const offsetString = `LIMIT $${valueCounter} OFFSET $${valueCounter + 1}`;
  values.push(parseInt(enteredLimit));
  values.push(offset);

  const query = `
  SELECT
    m.merchantid,
    m.merchantaddress,
    m.merchantname,
    m.merchantphone,
    m.merchantimage,
    AVG(reviewrating)::numeric(10,1) as reviewaverage
  FROM  merchant m LEFT JOIN packet p ON m.merchantid = p.merchantid
    LEFT JOIN review r ON p.packetid = r.packetid
  WHERE merchantname ILIKE '%${q}%'
  GROUP BY 
    m.merchantid,
    m.merchantaddress,
    m.merchantname,
    m.merchantphone,
    m.merchantimage
  ORDER BY reviewaverage ASC
  ${offsetString};
  `;

  try {
    const results = await pool.query(query, values);
    let merchants = processEmptyAverageReview(results.rows);
    res.json(merchants);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/home", async (req, res) => {
  try {
    const query = `
        SELECT
          m.merchantid,
          m.merchantaddress,
          m.merchantname,
          m.merchantphone,
          m.merchantimage,
          AVG(reviewrating)::numeric(10,1) as reviewaverage
        FROM  merchant m LEFT JOIN packet p ON m.merchantid = p.merchantid
          LEFT JOIN review r ON p.packetid = r.packetid
        GROUP BY 
          m.merchantid,
          m.merchantaddress,
          m.merchantname,
          m.merchantphone,
          m.merchantimage
        ORDER BY reviewaverage ASC
        LIMIT 10;
        `;

    const results = await pool.query(query);

    let merchants = processEmptyAverageReview(results.rows);

    res.status(200).json({
      status: "success",
      data: {
        merchantData: merchants,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create new merchant
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        INSERT INTO Merchant (MerchantID, CustomerID, MerchantImage, MerchantName, MerchantAddress, MerchantPhone)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;

    const results = await pool.query(query, [
      body.MerchantID,
      body.CustomerID,
      body.MerchantImage,
      body.MerchantName,
      body.MerchantAddress,
      body.MerchantPhone,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        merchantData: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update merchant's data
router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        UPDATE Merchant
        SET
            MerchantName = $2,
            MerchantAddress = $3,
            MerchantPhone = $4,
            MerchantImage = $5
        WHERE
            MerchantID = $1
        RETURNING *;
        `;

    const results = await pool.query(query, [
      req.params.id,
      body.MerchantName,
      body.MerchantAddress,
      body.MerchantPhone,
      body.MerchantImage,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        merchantData: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get a merchant's data
router.get("/:id", async (req, res) => {
  try {
    const query = `
        SELECT
            *
        FROM
            Merchant
        WHERE
            MerchantID = $1;
        `;

    const results = await pool.query(query, [req.params.id]);

    const packetQuery = `
        SELECT
            p.packetid,
            p.packetname,
            p.packetimage,
            p.packetprice,
            p.packetdescription
        FROM packet p
        WHERE p.merchantid = $1;
        `;
    const packetResults = await pool.query(packetQuery, [req.params.id]);
    const packets = packetResults.rows;

    const packetRatingQuery = `
    SELECT
      AVG(reviewrating)::numeric(10,1) as packetratingaverage,
      COUNT(reviewrating) as packetratingcount
    FROM packet p JOIN review r ON p.packetid = r.packetid
    WHERE p.packetid = $1;
  `;

    const packetSoldQuery = `
    SELECT 
      COUNT(*) AS sold
    FROM orders
    WHERE packetid = $1;

  `;

    packets.forEach(async (packet) => {
      const packetRatingResponse = await pool.query(packetRatingQuery, [
        packet.packetid,
      ]);
      const packetRating = packetRatingResponse.rows[0];

      packet.packetratingcount = packetRating.packetratingcount;
      if (packetRating.packetratingcount === "0") {
        packet.packetratingaverage = "0.0";
      } else {
        packet.packetratingaverage = packetRating.packetratingaverage;
      }

      const packetSoldResponse = await pool.query(packetSoldQuery, [
        packet.packetid,
      ]);
      const packetSold = packetSoldResponse.rows[0];
      packet.sold = packetSold.sold;
    });


    const merchantReviewCountQuery = `
    SELECT
      AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM review AS r JOIN packet AS p ON r.packetid = p.packetid
        JOIN merchant AS m ON p.merchantid = m.merchantid
    WHERE m.merchantid = $1;
    `;

    const averageRating = await pool.query(merchantReviewCountQuery, [
      req.params.id,
    ]);

    const merchantData = results.rows[0];
    merchantData.reviewrating =
      averageRating.rows[0].reviewaverage === null
        ? "0.0"
        : averageRating.rows[0].reviewaverage;

    res.status(200).json({
      status: "success",
      data: {
        merchantData: merchantData,
        packetData: packetResults.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

const processEmptyAverageReview = (data) => {
  return data.map((data) =>
    data.reviewaverage === null ? { ...data, reviewaverage: "0.0" } : data
  );
};
