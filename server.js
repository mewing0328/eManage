//Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const inquirerQuestions = require('./lib/inquirerQuestions');

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

init();
function init(){
  console.log("Hello! Welcome to eManage, your employee database.");
  connection.connect((err) => {
    if (err) throw err;
    console.log(`Testing connection`);
    askUser();
  }); 
};

function askUser () {
  inquirer.prompt(inquirerQuestions.menu)
  .then((answer) => {
      if (answer.menuAnswer === 'View All Employees'){
          viewAllEmpl();
      console.log("The choice works!");
      //CODE BROKEN HERE! Console.log not working.
      }
      else
      {console.log(answer.menuAnswer);
      }
    });
  };

const viewAllEmpl = () => {
  console.log('This here first works!')

  let sqlProcedure = 
      `SELECT id, first_name, last_name, role_title, dept_name, salary, manager
      FROM employees
      NATURAL JOIN roles
      NATURAL JOIN departments`;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.table)
      .then ( () => connection.end());
};

// // with placeholder
// connection.query(
//   'SELECT * FROM `employees` WHERE `first_name` = ? OR `role_id` = ?',
//   ['John', 1],
//   function(err, results) {
//     console.table(results);
//   }
// );

// // with placeholder
// connection.query(
//   'SELECT * FROM `employees` WHERE `first_name` = ? OR `role_id` = ?',
//   ['John', 1],
//   function(err, results) {
//     console.table(results);
//   }
// );









// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });