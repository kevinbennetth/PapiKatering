const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const query = `
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

    const results = await pool.query(query, [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        customerData: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update user's data
router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const query = `
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

    const results = await pool.query(query, [
      body.CustomerName,
      body.CustomerDOB,
      body.CustomerGender,
      body.CustomerEmail,
      body.CustomerPhone,
      body.CustomerImage,
      body.CustomerPassword,
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        customerData: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create new user
router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const queryCustomer = `
        INSERT INTO Customer (CustomerName, CustomerEmail, CustomerPhone, CustomerDOB, CustomerGender, CustomerPassword)
        VALUES 
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
    const queryAddress = `
        INSERT INTO Address (CustomerID, AddressName, AddressDetails)
        VALUES
        ($1, 'Unnamed Address', $2)
        RETURNING *;
        `;

    const resultsCustomer = await pool.query(queryCustomer, [
      body.CustomerName,
      body.CustomerEmail,
      body.CustomerPhone,
      body.CustomerDOB,
      body.CustomerGender,
      body.CustomerPassword,
    ]);
    const customerID = resultsCustomer.rows[0].customerid;
    const resultsAddress = await pool.query(queryAddress, [
      customerID,
      body.CustomerAddress,
    ]);

    res.status(201).json({
      status: "Successfully registered !",
      CustomerID: customerID,
    });
  } catch (err) {
    console.log(err);
  }
});

// post user's data for validation
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        SELECT
            c.CustomerID
        FROM
            Customer c
        WHERE
            CustomerEmail = $1
            AND CustomerPassword = $2;
        `;

    const merchantQuery = `
        SELECT
            m.merchantid
        FROM
            Merchant m
        WHERE
            m.customerid = $1;
        `;

    const results = await pool.query(query, [body.Email, body.Password]);

    if (results.rowCount > 0) {
      const merchantResults = await pool.query(merchantQuery, [
        results.rows[0].customerid,
      ]);

      let merchantID = "";
      if (merchantResults.rowCount > 0) {
        merchantID = results.rows[0].merchantid;
      }

      res.status(201).json({
        status: "success",
        data: {
          returned: {
            customerID: results.rows[0].customerid,
            merchantID: merchantID,
          },
        },
      });
    } else {
      res.status(201).json({
        status: "failed",
        data: {
          returned: body,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
