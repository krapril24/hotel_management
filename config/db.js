// db.js (database connection module)
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,          
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,  
    waitForConnections: true,
    connectionLimit: 10,        
    queueLimit: 0
});

// Export the pool for global use
module.exports = pool;
