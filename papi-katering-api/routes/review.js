const express = require("express");
const pool = require("../db");
const router = express.Router();
const util = require("../utils/utility");

router.get("/", async (req, res) => {
  const { type, packetID, customerID } = req.body;

    let queryString = "";
    let values = [];

    if(type === "packet") {
        queryString = `
        SELECT
            *
        FROM
            review r
            JOIN customer c on c.CustomerID = r.CustomerID
            JOIN packet p on p.PacketID = r.PacketID
        WHERE
            r.CustomerID = $1,
            p.PacketID = $2;
        `
        values = [customerID, packetID];
    } else if (type === "user") {
        queryString = `
        SELECT
            *
        FROM
            review r
            JOIN customer c on c.CustomerID = r.CustomerID
            JOIN packet p on p.PacketID = r.PacketID
            JOIN merchant m on m.merchantID = p.merchantID
        WHERE
            r.CustomerID = $1;
        `
        values = [customerID];
    }

    try {
        const resReview = await pool.query(queryString, values);
        res.status(200).json(resReview.rows);
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
  const { customerid, packetid, rating, description } = req.body;

  const queryString = `
        INSERT INTO Review (customerid, packetid, reviewdate, reviewrating, reviewdescription)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
  const reviewdate = util.getCurrentDate();

  const values = [customerid, packetid, reviewdate, rating, description];

  try {
    const resReview = await pool.query(queryString, values);
    if (resReview.rowCount > 0) {
      res.status(200).json({ message: "Successfully Added a Review !" });
    } else {
      res.status(400).json({ error: `There's an ID that doesn't exists` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { rating, description } = req.body;

  const queryString = `
        UPDATE review
        SET reviewrating = $1,
            reviewdescription = $2,
            reviewdate = $3
        WHERE reviewid = $4
        RETURNING *;
    `;

  const reviewDate = util.getCurrentDate();
  const values = [rating, description, reviewDate, id];

  try {
    const resReview = await pool.query(queryString, values);
    if (resReview.rowCount > 0) {
      res.status(200).json({ message: "Successfully Updated Review !" });
    } else {
      res.status(400).json({ error: `There's no review with ID ${id}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
