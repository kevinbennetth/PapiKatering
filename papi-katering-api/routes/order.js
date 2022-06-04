const express = require("express");
const pool = require("../db");
const router = express.Router();
const util = require("../utils/utility");

router.get("/", async (req, res) => {
  let status = req.query.status;

  let queryString;
  let values;
  let statusID;

  if (status === "ongoing") {
    statusID = 0;
  } else if (status === "finished") {
    statusID = 1;
  }

  if (req.query.customerID) {
    const customerID = req.query.customerID;
    queryString =
      `
      SELECT
        *
      FROM
        Orders o
        JOIN Packet p on p.PacketID = o.PacketID
        JOIN Merchant m on m.MerchantID = o.MerchantID
      WHERE
        o.CustomerID = $1
        AND o.OrderStatus = $2;
      `;
    
    values = [customerID, statusID];
  } else if (req.query.merchantID) {
    const merchantID = req.query.merchantID;
    queryString =
    `
    SELECT
      *
    FROM
      Orders o
      JOIN Packet p on p.PacketID = o.PacketID
      JOIN Merchant m on m.MerchantID = o.MerchantID
    WHERE
      o.MerchantID = $1
      AND o.OrderStatus = $2;
    `
    values = [merchantID, statusID];
  }

  try {
    const allOrder = await pool.query(queryString, values);
    res.status(200).json(allOrder.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    packetID,
    merchantID,
    customerID,
    addressID,
    paymentID,
    dayCount,
    additionalPrice,
    quantity,
  } = req.body;

  const queryString =
    "INSERT INTO orders (packetid, merchantid, customerid, addressid, paymentid, orderdate, orderdaycount, orderadditionalprice, orderquantity, orderstatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";

  const orderDate = util.getCurrentDate();
  const orderStatus = 0;
  console.log(orderDate);

  const values = [
    packetID,
    merchantID,
    customerID,
    addressID,
    paymentID,
    orderDate,
    dayCount,
    additionalPrice,
    quantity,
    orderStatus,
  ];

  try {
    await pool.query(queryString, values);
    res.status(200).json({ message: "Successfully added new order" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
