const mysql = require('mysql2');
const chalk = require('chalk');
const log = console.log;

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
    log(""),
    log(chalk.green.italic(`Connected to the employees_db database.`)),
    log(""),
);

module.exports = connection;