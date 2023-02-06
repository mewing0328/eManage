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
      else if (answer.menuAnswer === 'View All Roles'){
        viewAllRoles();
      }
      else if (answer.menuAnswer === 'Add Department'){
        addDept();
      }
      else if (answer.menuAnswer === 'Add Role'){
        addRole();
      }
      else
      {console.log('BUG AT askUser function');
      }
    });
  };



  // VIEW ALL DEPARTMENTS
  const viewAllDepts = () => {
    let sqlProcedure = 
        `SELECT dept_id AS 'ID', dept_name AS 'DEPARTMENT'
        FROM departments`;
    connection.promise().query(sqlProcedure)
        .then ( ([rows, fields]) => {
          console.table(rows);
        })
        .catch(console.table)
        .then (askUser);
};
  

  // VIEW ALL ROLES
  const viewAllRoles = () => {
    let sqlProcedure = 
        `SELECT role_id AS 'ID', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary AS 'SALARY'
        FROM roles
        NATURAL JOIN departments`;
    connection.promise().query(sqlProcedure)
        .then ( ([rows, fields]) => {
          console.table(rows);
        })
        .catch(console.table)
        .then (askUser);
};


  // VIEW ALL EMPLOYEES
const viewAllEmpl = () => {
  let sqlProcedure = 
      `SELECT id AS 'ID', first_name AS 'FIRST NAME', last_name AS 'LAST NAME', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary 'SALARY', manager AS 'MANAGER'
      FROM employees
      NATURAL JOIN roles
      NATURAL JOIN departments`;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.table)
      .then (askUser);
};

// ADD DEPT
const addDept = () => {
  inquirer.prompt(inquirerQuestions.department)
  .then((answer) => {
  let response = answer.newDept;
  let sqlProcedure = 
    `INSERT INTO departments (dept_name)
    VALUES (?)`;
  connection.promise().query(sqlProcedure, response)
    .then ( ([rows]) => {
      console.table('Row inserted:' + results.affectedRows);
    })
    .catch (console.table)
    .then (viewAllDepts)
    .then (askUser); 
  })
};


// ADD ROLE
const addRole = () => {

 // run a SQL query for the current departments
  let sqlProcedure = 
    `SELECT dept_name FROM departments`
    connection.promise().query(sqlProcedure)
    .then ( ([rows]) => {
      console.table(rows);
        inquirer.prompt ([
          {
            type: 'list',
            name: 'newRoleDept',
            message: 'Which department does the new role belong?',
            choices: rows
          }
        ])
      },
    )
    // .then (inquirer.prompt(inquirerQuestions.role));
};



  
  

  




// USE for when the user is done 
// .then ( () => connection.end());
