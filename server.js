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

// Initiate app and start with the menu inquirer
init();
function init(){
  console.log("Hello! Welcome to eManage, your employee database.");
  connection.connect((err) => {
    if (err) throw err;
    askUser();
  }); 
};

function askUser () {
  inquirer.prompt(inquirerQuestions.menu)
  .then((answer) => {
      if (answer.menuAnswer === 'View All Departments') {
          viewAllDepts();
      }
      else if (answer.menuAnswer === 'View All Employees'){
          viewAllEmpl();
      }
      else
      {console.log('BUG AT askUser function');
      }
    });
  };



  // VIEW ALL DEPARTMENTS
  const viewAllDepts = () => {
    let sqlProcedure = 
        `SELECT dept_id AS 'ID', dept_name AS 'NAME'
        FROM departments`;
    connection.promise().query(sqlProcedure)
        .then ( ([rows, fields]) => {
          console.table(rows);
        })
        .catch(console.table)
        .then ( () => connection.end());
  };
  

  // VIEW ALL EMPLOYEES

const viewAllEmpl = () => {
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


// USE for when the user is done 
// .then ( () => connection.end());
