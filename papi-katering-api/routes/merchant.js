const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query =
        `
        SELECT
            *
        FROM
            Merchant
        `;

        const results = await pool.query(
            query
        );

        res.status(200).json({
            status: "success",
            data: {
                merchantData: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// create new merchant
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const query = 
        `
        INSERT INTO Merchant (MerchantID, CustomerID, MerchantImage, MerchantName, MerchantAddress, MerchantPhone)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;

        const results = await pool.query(
            query,
            [body.MerchantID, body.CustomerID, body.MerchantImage, body.MerchantName, body.MerchantAddress, body.MerchantPhone]
        );

        res.status(201).json({
            status: "success",
            data: {
                merchantData: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// update merchant's data
router.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const query =
        `
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

        const results = await pool.query(
            query,
            [req.params.id, body.MerchantName, body.MerchantAddress, body.MerchantPhone, body.MerchantImage]
        );

        res.status(200).json({
            status: "success",
            data: {
                merchantData: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// get a merchant's data
router.get("/:id", async (req, res) => {
    try {
        const body = req.body;
        const query =
        `
        SELECT
            *
        FROM
            Merchant
        WHERE
            MerchantID = $1;
        `;

        const results = await pool.query(
            query,
            [req.params.id]
        );

        res.status(200).json({
            status: "success",
            data: {
                merchantData: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;