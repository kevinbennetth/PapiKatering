// env file
require("dotenv").config();

// setup
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express()

app.use(cors());
app.use(express.json());
// User --

// Merchant -- 

// Packet

// Reviews

// Order

// Payment --

// Address

// Preference



// Turn on server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server up, listening on port ${port}`);
})