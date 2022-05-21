const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const query = 
        `
        SELECT
            CustomerID,
            CustomerName,
            CustomerDOB,
            CustomerGender,
            CustomerEmail,
            CustomerPhone,
            CustomerImage
        FROM
            Customer
        WHERE
            CustomerID = $1
        `;
        
        const results = await pool.query(
            query,
            [req.params.id]
        );

        res.status(200).json({
            status: "success",
            data: {
                customerData: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err)
    }
});

// update user's data
router.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const query =
        `
        UPDATE Customer
        SET 
            CustomerName = $1,
            CustomerDOB = $2,
            CustomerGender = $3,
            CustomerEmail = $4,
            CustomerPhone = $5,
            CustomerImage = $6,
            CustomerPassword = $7
        WHERE
            CustomerID = $8
        RETURNING *;
        `;

        const results = await pool.query(
            query,
            [body.CustomerName, body.CustomerDOB, body.CustomerGender, body.CustomerEmail, body.CustomerPhone, body.CustomerImage, body.CustomerPassword, req.params.id]
        );

        res.status(200).json({
            status: "success",
            data: {
                customerData: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
});

// create new user
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const queryCustomer = 
        `
        INSERT INTO Customer (CustomerID, CustomerName, CustomerEmail, CustomerPhone, CustomerDOB, CustomerGender, CustomerPassword)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
        const queryAddress =
        `
        INSERT INTO Address (AddressID, CustomerID, AddressName, AddressDetails)
        VALUES
        ($1, $2, 'unnamed address', $3)
        RETURNING *;
        `;

        const resultsCustomer = await pool.query(
            queryCustomer,
            [body.CustomerID, body.CustomerName, body.CustomerEmail, body.CustomerPhone, body.CustomerDOB, body.CustomerGender, body.CustomerPassword]
        );

        const resultsAddress = await pool.query(
            queryAddress,
            [body.CustomerID, body.AddressID, body.CustomerAddress]
        );

        console.log(resultsCustomer);

        res.status(201).json({
            status: "success",
            data: {
                customerData: resultsCustomer.rows[0],
                addressData: resultsAddress.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// post user's data for validation
router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const query = 
        `
        SELECT
            c.CustomerID,
            m.MerchantID
        FROM
            Customer c
            JOIN Merchant m on c.CustomerID = m.CustomerID
        WHERE
            CustomerEmail = $1
            AND CustomerPassword = $2
        `;
        
        const results = await pool.query(
            query,
            [body.Email, body.Password]
        );

        if(results.rowCount>0){
            res.status(201).json({
                status: "success",
                data: {
                    returned: results.rows[0]
                }
            });
        }
        else{
            res.status(201).json({
                status: "failed",
                data: {
                    returned: body
                }
            });
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;