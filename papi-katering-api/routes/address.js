const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const { customerID } = req.query;
  const queryString = "SELECT * FROM address WHERE customerid=$1;";
  const values = [customerID];

  try {
    const allAddress = await pool.query(queryString, values);
    res.status(200).json(allAddress.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { customerID, name, detail } = req.body;

  const queryString =
    "INSERT INTO address (customerid, addressname, addressdetails) VALUES ($1, $2, $3) RETURNING *;";
  const values = [customerID, name, detail];

  try {
    await pool.query(queryString, values);
    res.status(200).json({ message: "Successfully added new address" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = "SELECT * FROM address WHERE addressid = $1";
  const values = [id];

  try {
    const address = await pool.query(queryString, values);

    if (address.rowCount > 0) {
      res.status(200).json(address.rows[0]);
    } else {
      res.status(400).json({ error: `There's no address with ID ${id}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, detail } = req.body;

  const queryString =
    "UPDATE address SET addressname = $1, addressdetails = $2 WHERE addressid = $3 RETURNING *";
  const values = [name, detail, id];

  try {
    const updatedAddress = await pool.query(queryString, values);

    if (updatedAddress.rowCount > 0) {
      res
        .status(200)
        .json({ message: `Successfully updated address with ID ${id}` });
    } else {
      res.status(400).json({ error: `There's no address with ID ${id}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const queryString = "DELETE FROM address WHERE addressid = $1 RETURNING *";
  const values = [id];

  try {
    const deletedAddress = await pool.query(queryString, values);

    if (deletedAddress.rowCount > 0) {
      res
        .status(200)
        .json({ message: `Successfully deleted address with ID ${id}` });
    } else {
      res.status(400).json({ error: `There's no address with ID ${id}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
