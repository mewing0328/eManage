//Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const inquirerQuestions = require('./lib/inquirerQuestions');

const db = mysql.createConnection(
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

init();
function init(){
  console.log("Hello! Welcome to eManage, your employee database.");
  db.connect((err) => {
    if (err) throw err;
    console.log(`Testing connection`);
    askUser();
  }); 
};

function askUser(){
  inquirer.prompt(inquirerQuestions.menu)
  .then((menuAnswer) => {
      if (menuAnswer === "View All Employees"){
      //     viewAllEmpl();
      console.log("The choice works!")
      //CODE BROKEN HERE! Console.log not working.
      };
    })
  };

function viewAllEmpl () {
  console.log('This here first works!')

  let sqlProcedure = 
      `SELECT id, first_name, last_name, role_title, dept_name, salary, manager
      FROM employees
      NATURAL JOIN roles
      NATURAL JOIN departments`;
  db.promise().query(sqlProcedure, (err, response) => {
    if (err) throw err;
    console.log('This works!')
    cTable(response);
    });
};










// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });