// env file
require("dotenv").config();

// setup
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routers
const packetRouter = require("./routes/packet");
const merchantRouter = require("./routes/merchant");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const addressRouter = require("./routes/address");
const preferenceRouter = require("./routes/preference");
const reviewRouter = require("./routes/review");
const categoryRouter = require("./routes/category");

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/packet", packetRouter);
app.use("/merchant", merchantRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/address", addressRouter);
app.use("/preference", preferenceRouter);
app.use("/review", reviewRouter);
app.use("/category", categoryRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`server up, listening on port ${PORT}`);
});
