const e = require("express");
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update user's data
router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    let results;
    if (body.CustomerPassword) {
      const query = `
        UPDATE Customer
        SET 
            CustomerPassword = $1
        WHERE
            CustomerID = $2
        RETURNING *;
      `;
      results = await pool.query(query, [body.CustomerPassword, req.params.id]);
    } else {
      const query = `
          UPDATE Customer
          SET 
              CustomerName = $1,
              CustomerDOB = $2,
              CustomerGender = $3,
              CustomerEmail = $4,
              CustomerPhone = $5,
              CustomerImage = $6
          WHERE
              CustomerID = $7
          RETURNING *;
          `;

      const values = [
        body.CustomerName,
        body.CustomerDOB,
        body.CustomerGender,
        body.CustomerEmail,
        body.CustomerPhone,
        body.CustomerImage,
        req.params.id,
      ];

      results = await pool.query(query, values);
    }

    res.status(200).json({
      status: "success",
      data: {
        customerData: results.rows[0],
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create new user
router.post("/register", async (req, res) => {
  try {
    const body = req.body;

    const queryCheck = `
      SELECT *
      FROM customer
      WHERE customeremail = $1;
    `;

    const checkReturn = await pool.query(queryCheck, [body.CustomerEmail]);

    if (checkReturn.rowCount > 0) {
      res.status(201).json({
        status: "Taken",
      });
    } else {
      const queryCustomer = `
        INSERT INTO Customer (CustomerName, CustomerImage, CustomerEmail, CustomerPhone, CustomerDOB, CustomerGender, CustomerPassword)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
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
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        body.CustomerEmail,
        body.CustomerPhone,
        body.CustomerDOB,
        body.CustomerGender,
        body.CustomerPassword,
      ]);
      const resultsAddress = await pool.query(queryAddress, [
        resultsCustomer.rows[0].customerid,
        body.CustomerAddress,
      ]);

      res.status(201).json({
        status: "Success",
        customerID: resultsCustomer.rows[0].customerid,
        customerName: resultsCustomer.rows[0].customername,
        customerImage: resultsCustomer.rows[0].customerimage,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// post user's data for validation
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const query = `
        SELECT
            c.CustomerID,
            c.customerimage,
            c.customername,
            m.merchantid
        FROM
            Customer c LEFT JOIN merchant m ON c.customerid = m.customerid
        WHERE
            CustomerEmail = $1
            AND CustomerPassword = $2;
        `;

    const results = await pool.query(query, [body.Email, body.Password]);

    if (results.rowCount > 0) {
      res.status(201).json({
        status: "success",
        data: {
          returned: {
            customerID: results.rows[0].customerid,
            customerName: results.rows[0].customername,
            customerImage: results.rows[0].customerimage,
            merchantID: results.rows[0].merchantid,
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
