const express = require("express");
const pool = require("../db");
const router = express.Router();

// get all payment
router.get("/", async (req, res) => {
  try {
    const body = req.query;
    const query = `
            SELECT
                *
            FROM
                payment
            WHERE
                customerid = $1;
            `;

    const results = await pool.query(query, [body.customerID]);

    res.status(200).json({
      status: "success",
      data: {
        customerID: body.customerID,
        payments: results.rows,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create new payment
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        INSERT INTO Payment (CustomerID, PaymentName, PaymentNumber)
        VALUES 
        ($1, $2, $3)
        RETURNING *;
        `;

    const results = await pool.query(query, [
      body.customerID,
      body.name,
      body.cardNumber,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        payment: results.rows[0],
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get payment based on id
router.get("/:id", async (req, res) => {
  try {
    const query = `
            SELECT
                *
            FROM
                Payment
            WHERE
                PaymentID = $1;
            `;

    const results = await pool.query(query, [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        payment: results.rows[0],
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update payment based on id
router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        UPDATE Payment
        SET
            PaymentName = $1,
            PaymentNumber = $2
        WHERE
            PaymentID = $3
        RETURNING *;
        `;

    const results = await pool.query(query, [
      body.name,
      body.cardNumber,
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        payment: results.rows[0],
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete payment based on id
router.delete("/:id", async (req, res) => {
  try {
    const query = `
        DELETE FROM Payment
        WHERE
            PaymentID = $1;
        `;

    const result = await pool.query(query, [req.params.id]);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
