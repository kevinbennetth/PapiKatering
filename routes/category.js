const express = require("express");
const pool = require("../db");
const router = express.Router();
const util = require("../utils/utility");

router.get("/", async (req, res) => {
    const queryString = "SELECT * FROM category;";
  
    try {
      const allCategories = await pool.query(queryString);
      res.status(200).json(allCategories.rows);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})

module.exports = router;