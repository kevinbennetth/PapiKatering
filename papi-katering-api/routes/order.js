const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  let queryString;
  let values;
  let { status } = req.body;
  let statusID;

  if (status === "ongoing") {
    statusID = 0;
  } else if (status === "finished") {
    statusID = 1;
  }

  if (req.body.customer_id) {
    const { customer_id } = req.body;
    queryString =
      "SELECT * FROM orders WHERE customerid = $1 AND orderstatus = $2;";
    values = [customer_id, statusID];
  } else if (req.body.customer_id) {
    const { merchant_id } = req.body;
    queryString =
      "SELECT * FROM orders WHERE merchantid = $1 AND orderstatus = $2;";
    values = [merchant_id, statusID];
  }

  try {
    const allOrder = await pool.query(queryString, values);
    res.status(400).json(allOrder.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    packet_id,
    merchant_id,
    customer_id,
    address_id,
    payment_id,
    day_count,
    additional_price,
    quantity,
  } = req.body;

  const queryString =
    "INSERT INTO orders (packetid, merchantid, customerid, addressid, paymentid, orderdate, orderdaycount, orderadditionalprice, orderquantity, orderstatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";

  const order_date = getCurrentDate();
  const order_status = 0;
  console.log(order_date);

  const values = [
    packet_id,
    merchant_id,
    customer_id,
    address_id,
    payment_id,
    order_date,
    day_count,
    additional_price,
    quantity,
    order_status,
  ];

  try {
    const newAddress = await pool.query(queryString, values);
    res.status(400).json({ message: "Successfully added new order" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCurrentDate = () => {
  const currDate = new Date();
  const dateStr = `${currDate.getFullYear()}-${
    currDate.getMonth() + 1
  }-${currDate.getDate()}`;
  return dateStr;
};

module.exports = router;
