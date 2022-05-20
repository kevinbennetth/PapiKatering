// env file
require("dotenv").config();

// setup
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Routers
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const packetRouter = require("./routes/packet");
const preferenceRouter = require("./routes/preference");

// User OR Customer --
    // get user's data
    app.get("/user/:id", async (req, res) => {
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
            
            const results = await db.query(
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
    app.patch("/user/:id", async (req, res) => {
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

            const results = await db.query(
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
    app.post("/user/register", async (req, res) => {
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

            const resultsCustomer = await db.query(
                queryCustomer,
                [body.CustomerID, body.CustomerName, body.CustomerEmail, body.CustomerPhone, body.CustomerDOB, body.CustomerGender, body.CustomerPassword]
            );

            const resultsAddress = await db.query(
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
    app.post("/user/login", async (req, res) => {
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
            
            const results = await db.query(
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

// Merchant -- 
    // get all merchant
    app.get("/merchant", async (req, res) => {
        try {
            const query =
            `
            SELECT
                *
            FROM
                Merchant
            `;

            const results = await db.query(
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
    app.post("/merchant", async (req, res) => {
        try {
            const body = req.body;
            const query = 
            `
            INSERT INTO Merchant (MerchantID, CustomerID, MerchantImage, MerchantName, MerchantAddress, MerchantPhone)
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `;

            const results = await db.query(
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
    app.patch("/merchant/:id", async (req, res) => {
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

            const results = await db.query(
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
    app.get("/merchant/:id", async (req, res) => {
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

            const results = await db.query(
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

// Packet
app.use("/packet", packetRouter);
// Reviews

// Order
app.use("/order", orderRouter);

// Payment --
    // get all payment
    app.get("/payment", async (req, res)=> {
        try {
            const body = req.body;
            const query = 
                `
                SELECT
                    *
                FROM
                    Payment
                WHERE
                    CustomerID = $1;
                `;
            
            const results = await db.query(
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
    app.post("/payment", async (req, res)=> {
        try {
            const body = req.body;
            const query = 
            `
            INSERT INTO Payment (PaymentID, CustomerID, PaymentName, PaymentNumber)
            VALUES 
            ($1, $2, $3, $4)
            RETURNING *;
            `;

            const results = await db.query(
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
    app.get("/payment/:id", async (req, res)=> {
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

            const results = await db.query(
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
    app.patch("/payment/:id", async (req, res)=> {
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

            const results = await db.query(
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
    app.delete("/payment/:id", async (req, res)=> {
        try {
            const query =
            `
            DELETE FROM Payment
            WHERE
                PaymentID = $1;
            `;

            const result = await db.query(
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


// Address
app.use("/address", addressRouter);

// Preference
app.use("/preference", preferenceRouter);



// Turn on server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server up, listening on port ${port}`);
});
