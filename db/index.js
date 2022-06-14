const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? productionConfig : devConfig);

module.exports = {
    query: (text, params) => pool.query(text,params),
}