const express = require("express");
const pool = require("../db");
const router = express.Router();

// get all payment
router.get("/", async (req, res)=> {
    try {
        const body = req.query;
        const query = 
            `
            SELECT
                *
            FROM
                Payment
            WHERE
                CustomerID = $1;
            `;
        
        const results = await pool.query(
            query,
            [body.customerID]
        );

        res.status(200).json({
            status: "success",
            data: {
                customerID: body.customerID,
                payments: results.rows
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// create new payment
router.post("/", async (req, res)=> {
    try {
        const body = req.body;
        const query = 
        `
        INSERT INTO Payment (PaymentID, CustomerID, PaymentName, PaymentNumber)
        VALUES 
        ($1, $2, $3, $4)
        RETURNING *;
        `;

        const results = await pool.query(
            query,
            [body.paymentID, body.customerID, body.name, body.cardNumber]
        );

        res.status(201).json({
            status: "success",
            data: {
                payment: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// get payment based on id
router.get("/:id", async (req, res)=> {
    try {
        const query = 
            `
            SELECT
                *
            FROM
                Payment
            WHERE
                PaymentID = $1;
            `;

        const results = await pool.query(
            query,
            [req.params.id]
        );

        res.status(200).json({
            status: "success",
            data: {
                payment: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// update payment based on id
router.put("/:id", async (req, res)=> {
    try {
        const body = req.body;
        const query =
        `
        UPDATE Payment
        SET 
            PaymentName = $1,
            PaymentNumber = $2
        WHERE
            PaymentID = $3
        RETURNING *;
        `;

        const results = await pool.query(
            query,
            [body.name, body.cardNumber, req.params.id]
        );


        res.status(200).json({
            status: "success",
            data: {
                payment: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// delete payment based on id
router.delete("/:id", async (req, res)=> {
    try {
        const query =
        `
        DELETE FROM Payment
        WHERE
            PaymentID = $1;
        `;

        const result = await pool.query(
            query,
            [req.params.id]
        );

        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.log(error);
    }
});

module.exports = router;