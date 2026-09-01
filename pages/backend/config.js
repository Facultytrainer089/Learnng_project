
// backend/config.js

require("dotenv").config();

const config = {
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "ecommerce_db",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || ""
    },

    server: {
        port: process.env.PORT || 5000
    }
};

module.exports = config;

