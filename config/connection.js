const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username
        port: 3306,
        user: 'root',
        //MySQL password
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

module.exports = connection;