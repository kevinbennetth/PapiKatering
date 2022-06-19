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
    queryString = `
      SELECT
        *
      FROM
        Orders o
        JOIN Packet p on p.PacketID = o.PacketID
        JOIN Merchant m on m.MerchantID = o.MerchantID
      WHERE
        o.CustomerID = $1
        AND o.OrderStatus = $2
      ORDER BY o.orderdate DESC;
      `;

    values = [customerID, statusID];
  } else if (req.query.merchantID) {
    const merchantID = req.query.merchantID;
    queryString = `
    SELECT
      *
    FROM
      Orders o
      JOIN Packet p on p.PacketID = o.PacketID
      JOIN Customer c on o.customerid = c.customerid
    WHERE
      o.MerchantID = $1
      AND o.OrderStatus = $2
    ORDER BY o.orderdate DESC;
    `;
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
    packetid,
    merchantid,
    customerid,
    addressid,
    paymentid,
    orderdaycount,
    orderdate,
    orderadditionalprice,
    orderquantity,
  } = req.body;

  const queryString =
    "INSERT INTO orders (packetid, merchantid, customerid, addressid, paymentid, orderdate, orderdaycount, orderadditionalprice, orderquantity, orderstatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";

  const orderStatus = 0;

  const values = [
    packetid,
    merchantid,
    customerid,
    addressid,
    paymentid,
    orderdate,
    orderdaycount,
    orderadditionalprice,
    orderquantity,
    orderStatus,
  ];

  try {
    await pool.query(queryString, values);
    res.status(200).json({ message: "Successfully added new order" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  const query = `
    UPDATE orders
    SET orderstatus = $1
    WHERE orderid=$2;
  `;
  const values = [parseInt(status), parseInt(id)];
  try {
    await pool.query(query, values);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
