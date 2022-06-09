const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const queryString = "SELECT * FROM preference WHERE customerid=$1;";
  const values = [id];

  try {
    const preference = await pool.query(queryString, values);
    if (preference.rowCount > 0) {
      res.status(200).json(preference.rows[0]);
    } else {
      res.status(200).json({ message: "NOT FOUND" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { CustomerID, Halal, Vegetarian, MinPrice, MaxPrice } = req.body;

  const queryString =
    "INSERT INTO preference (customerid, halal, vegetarian, minprice, maxprice) VALUES ($1, $2, $3, $4, $5);";
  const values = [CustomerID, Halal, Vegetarian, MinPrice, MaxPrice];
  
  try {
    await pool.query(queryString, values);
    res.status(200).json({ message: "Successfully added new preference" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  const { CustomerID, Halal, Vegetarian, MinPrice, MaxPrice } = req.body;

  const queryString =
    "UPDATE preference SET halal = $1, vegetarian = $2, minprice = $3, maxprice = $4 WHERE customerid=$5 RETURNING *;";
  const values = [Halal, Vegetarian, MinPrice, MaxPrice, CustomerID];
  console.log(values);

  try {
    const updatedPreference = await pool.query(queryString, values);

    if (updatedPreference.rowCount > 0) {
      res.status(200).json({
        message: `Successfully updated preference with customer ID ${CustomerID}`,
      });
    } else {
      res.status(200).json({ message: "NOT FOUND" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
