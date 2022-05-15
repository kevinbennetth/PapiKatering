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

// User --

// Merchant --

// Packet
app.use("/packet", packetRouter);
// Reviews

// Order
app.use("/order", orderRouter);

// Payment --

// Address
app.use("/address", addressRouter);

// Preference
app.use("/preference", preferenceRouter);

// Turn on server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server up, listening on port ${port}`);
});
