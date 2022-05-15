const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const queryString = "SELECT * FROM address;";

  try {
    const allAddress = await pool.query(queryString);
    res.status(400).json(allAddress.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { customer_id, name, detail } = req.body;

  const queryString =
    "INSERT INTO address (customerid, addressname, addressdetails) VALUES ($1, $2, $3);";
  const values = [customer_id, name, detail];

  try {
    const newAddress = await pool.query(queryString, values);
    res.status(400).json({ message: "Successfully added new address" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = "SELECT * FROM address WHERE addressid = $1";
  const values = [id];

  try {
    const address = await pool.query(queryString, values);
    res.status(400).json(address.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { name, detail } = req.body;
  const { id } = req.params;

  const queryString =
    "UPDATE address SET addressname = $1, addressdetails = $2 WHERE addressid = $3";
  const values = [name, detail, id];

  try {
    _ = await pool.query(queryString, values);
    res
      .status(400)
      .json({ message: `Successfully updated address with id=${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = "DELETE FROM address WHERE addressid = $1";
  const values = [id];

  try {
    _ = await pool.query(queryString, values);
    res
      .status(400)
      .json({ message: `Successfully deleted address with id=${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
