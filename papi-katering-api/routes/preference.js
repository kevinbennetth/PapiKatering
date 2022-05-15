const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { customer_id } = req.body;
  const queryString = "SELECT * FROM preference WHERE customerid=$1;";
  const values = [customer_id];

  try {
    const preference = await pool.query(queryString, values);
    res.status(400).json(preference.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { customer_id, halal, vegetarian, min_price, max_price } = req.body;

  const queryString =
    "INSERT INTO preference (customerid, halal, vegetarian, minprice, maxprice) VALUES ($1, $2, $3, $4, $5);";
  const values = [customer_id, halal, vegetarian, min_price, max_price];

  try {
    _ = await pool.query(queryString, values);
    res.status(400).json({ message: "Successfully added new preference" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/", async (req, res) => {
  const { customer_id, halal, vegetarian, min_price, max_price } = req.body;

  const queryString =
    "UPDATE preference SET halal = $1, vegetarian = $2, minprice = $3, maxprice = $4 WHERE customerid=$5;";
  const values = [halal, vegetarian, min_price, max_price, customer_id];


  try {
    _ = await pool.query(queryString, values);
    res
      .status(400)
      .json({ message: `Successfully updated preference with customer id=${customer_id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
