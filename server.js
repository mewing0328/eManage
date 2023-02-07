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
  })
};


// ADD ROLE
const addRole = () => {          
          connection.promise().query(`SELECT * FROM departments`)
          .then ( ([rows]) => {
            //console.info(rows); // an object of just department names
            const departments = []; // created a blank array
            // for loop to push array items into the blank array
            for (let i=0; i < rows.length; i++) {
                departments.push(rows[i].dept_name) // my rows array had dept_name as the beginning part of each department
              }
              console.log (departments)
              inquirer.prompt ([
                        {
                          type: 'input',
                          name: 'newRole',
                          message: 'What is the name of the role?',
                          validate: function(answer){
                              if(!isNaN(answer)) return "Only use letters.";
                              else return true;
                          }
                      },
                      {
                          type: 'input',
                          name: 'newSalary',
                          message: 'What is the salary of the role?',
                          validate: function(answer){
                              if(isNaN(answer)) return "Only use numbers.";
                              else return true;
                          }
                      },
                      {
                        type: 'list',
                        name: 'newRoleDept',
                        message: 'Which department does the new role belong?',
                        choices: departments //shows each department from the const which was for looped above
                      }
                    ])
            
                  .then((answers) => {
                    let deptName = answers.newRoleDept
                    console.log(answers.newRoleDept)
                    console.log(rows)



                      for (let i=0; i < rows.length; i++) {
                        if (deptName === rows[i].dept_name) {
                          console.log(rows[i].dept_id)
                          deptId = rows[i].dept_id
                          console.log(deptId)


                          let responses = [
                            [answers.newRole],
                            [answers.newSalary],
                            [deptId]
                          ];
                          console.log(responses)
                          let sqlProcedure = 
                            `INSERT INTO roles (role_title, salary, dept_id)
                            VALUES (?, ?, ?)`;
                  
                          connection.promise().query(sqlProcedure, responses)
                          .then (viewAllRoles)
                        }
                      }


                 


                  })



            })


        

        

        
    



      

        // // run a SQL query for the current departments

        

        // //console.log(departments)




        // // const partTwo = () => {
        // //   inquirer.prompt(inquirerQuestions.role)
        // //   .then((answers) => {
        // //     let responses = [
        // //       [answers.newRole],
        // //       [answers.newSalary],
        // //       [answers.newRoleDept]
        // //     ];
        // //     console.log(responses)
        // //     let sqlProcedure = 
        // //       `INSERT INTO roles (role_title, salary, dept_id)
        // //       VALUES (?, ?, ?)`;
      
        // //     connection.promise().query(sqlProcedure, responses)
        // //       .then ( ([rows]) => {
        // //         console.table('Row inserted:' + results.affectedRows);
        // //       })
        // //       .catch(console.table)
        // //       // .then (viewAllRoles)
        // //     })
            
        // // }



};



  
  

  




// USE for when the user is done 
// .then ( () => connection.end());
