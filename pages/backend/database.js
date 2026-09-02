
// backend/database.js

const { Pool } = require("pg");
const config = require("./config");

// Create PostgreSQL connection pool
const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    user: config.database.user,
    password: config.database.password
});

// Test database connection
pool.connect()
    .then(client => {
        console.log("PostgreSQL database connected successfully!");

        client.release();
    })
    .catch(error => {
        console.error("PostgreSQL connection failed:");
        console.error(error.message);
    });

// Export pool
module.exports = pool;

