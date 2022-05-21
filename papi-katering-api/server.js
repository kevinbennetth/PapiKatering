// env file
require("dotenv").config();

// setup
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routers
const packetRouter = require("./routes/packet");
const merchantRouter = require("./routes/merchant");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment")
const addressRouter = require("./routes/address");
const preferenceRouter = require("./routes/preference");
const reviewRouter = require("./routes/review");

app.use("/packet", packetRouter);
app.use("/merchant", merchantRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/address", addressRouter);
app.use("/preference", preferenceRouter);
app.use("/review", reviewRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server up, listening on port ${port}`);
});
