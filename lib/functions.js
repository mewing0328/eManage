const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const connection = require('../config/connection');
const inquirerQuestions = require('./inquirerQuestions');

const askUser = () => {
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
      else if (answer.menuAnswer === 'Add Employee'){
        addEmployee();
      }
      else if (answer.menuAnswer === 'Update Employee Role'){
        updateEmplRole();
      }
      else if (answer.menuAnswer === 'Close Application'){
        console.log("=============================================================");
        console.log("                                                            ");
        console.log('Goodbye!')
        console.log("                                                            ");
        connection.end;
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
          console.log("=============================================================");
          console.log("                                                            ");
          console.table(rows);
          console.log("=============================================================");
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
          console.log("=============================================================");
          console.log("                                                            ");
          console.table(rows);
          console.log("=============================================================");
        })
        .catch(console.table)
        .then (askUser);
};


  // VIEW ALL EMPLOYEES
const viewAllEmpl = () => {
  let sqlProcedure = 
      `SELECT a.id AS 'ID', a.first_name AS 'FIRST NAME', a.last_name AS 'LAST NAME', roles.role_title AS 'JOB TITLE', roles.salary AS 'SALARY', departments.dept_name AS 'DEPARTMENT', CONCAT(b.first_name,' ',  b.last_name) as MANAGER
      FROM employees a
      NATURAL JOIN roles
      NATURAL JOIN departments
      LEFT JOIN employees b ON a.manager = b.id`;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        console.log("=============================================================");
        console.log("                                                            ");
        console.table(rows);
        console.log("=============================================================");
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
    console.log("=============================================================");
    console.log("                                                            ");
    console.log(`!----- New department added: ${response} -----!`)
    console.log("                                                            ");
    viewAllDepts()
  })
};


// ADD ROLE
const addRole = () => {  
  inquirer.prompt(inquirerQuestions.role)
  .then((answers) => {
    const newRoleArray = [answers.newRole, answers.newSalary]
    // GET the list of departments from database
    connection.promise().query(`SELECT * FROM departments`)
    .then ( ([rows]) => {
      const departments = []; // created a blank array for departments
      // department table utilizes name of dept_name as the name of departments
      for (let i=0; i < rows.length; i++) {departments.push(rows[i].dept_name)} 
      inquirer.prompt ([
        {
          type: 'list',
          name: 'newRoleDept',
          message: 'Which department does the new role belong?',
          choices: departments //shows each department from departments table
        }
      ])
      .then((answer) => {
        let deptName = answer.newRoleDept
        for (let i=0; i < rows.length; i++) {
          if (deptName === rows[i].dept_name) { 
            deptId = rows[i].dept_id
            newRoleArray.push(deptId)
            let sqlProcedure = 
              `INSERT INTO roles (role_title, salary, dept_id)
              VALUES (?, ?, ?)`;
            connection.promise().query(sqlProcedure, newRoleArray)
            console.log("=============================================================");
            console.log("                                                            ");
            console.log(`!----- New role added: ${answers.newRole} -----!`)
            console.log("                                                            ");
            viewAllRoles()
          }
        }             
      })
    })
  })
};

// ADD EMPLOYEE
const addEmployee = () => {
  inquirer.prompt(inquirerQuestions.employee)
  .then((answers) => {
    const newEmployeeArray = [answers.newEmpFirst, answers.newEmpLast]

      // GET the list of roles from database
      connection.promise().query('SELECT * FROM roles')
      .then ( ([rows]) => {
        const roles = []; //created a blank array for roles
        // roles table utilizes name of role_title as the name of roles
        for (let i=0; i < rows.length; i++) {roles.push(rows[i].role_title)}
        inquirer.prompt ([
          {
            type: 'list',
            name: 'newEmpRole',
            message: "What is the role of the new employee?",
            choices: roles //shows each role from roles table
          }
        ])
        .then((answer) => {
          let roleName = answer.newEmpRole
          for (let i=0; i < rows.length; i++) {
            if (roleName === rows[i].role_title) {
              roleId = rows[i].role_id
              newEmployeeArray.push(roleId)  
              
                    // GET the list of managers from database
                    connection.promise().query("SELECT id, CONCAT(first_name, ' ', last_name) AS mgrName, role_id, manager FROM employees")
                    .then ( ([rows]) => {
                      const managers = []; //created a blank array for managers
                      // employees table utilizes name of first_name and last_name as the name of managers
                      for (let i=0; i < rows.length; i++) {managers.push(rows[i].mgrName)}
                      managers.push('No Manager')
                      inquirer.prompt ([
                        {
                          type: 'list',
                          name: 'newEmpManager',
                          message: "Who is the manager for the new employee?",
                          choices: managers //shows each manager from employees table
                        }
                      ])
                      .then((answer) => {
                        let managerName = answer.newEmpManager
                          if (managerName === 'No Manager') {
                            // in SQL, NULL is considered a INT null would be as is without quotes
                            let managerId = null
                            newEmployeeArray.push(managerId)
                          } else {
                            for (let i=0; i < rows.length; i++) {
                              if (managerName === rows[i].mgrName) {
                                let managerId = rows[i].id
                                newEmployeeArray.push(managerId)       
                              }
                            }
                          }
                          let sqlProcedure =
                            `INSERT INTO employees (first_name, last_name, role_id, manager)
                            VALUES (?, ?, ?, ?)`;
                          connection.promise().query(sqlProcedure, newEmployeeArray)
                          console.log("=============================================================");
                          console.log("                                                            ");
                          console.log(`!----- New employee added: ${answers.newEmpFirst} ${answers.newEmpLast} -----!`)
                          console.log("                                                            ");
                          viewAllEmpl()
                      })
                    })
            }
          }
        })
      })
  }) 
};

// UPDATE EMPLOYEE ROLE
const updateEmplRole = () => {
let emplId = [];
let roleId = [];

  // GET the list of employees from database
  connection.promise().query("SELECT id, CONCAT(first_name, ' ', last_name) AS emplName, role_id, manager FROM employees")
  .then ( ([rows]) => {
    const employees = []; //created a blank array for employees
    // employees table utilizes name of first_name and last_name as the name of employees
    for (let i=0; i < rows.length; i++) {employees.push(rows[i].emplName)}
    inquirer.prompt ([
      {
        type: 'list',
        name: 'updateRoleEmplName',
        message: "Who is the manager for the new employee?",
        choices: employees //shows each manager from employees table
      }
    ])
    .then((answer) => {
      let chosenEmpl = answer.updateRoleEmplName
        for (let i=0; i < rows.length; i++) {
          if (chosenEmpl === rows[i].emplName) {
            emplId.push(rows[i].id)   // Employee id that will be used for sql update
          
              // GET the list of roles from database
              connection.promise().query("SELECT * FROM roles")
              .then ( ([rows]) => {
                const roles = []; //created a blank array for roles
                // roles table utilizes role_title
                for (let i=0; i < rows.length; i++) {roles.push(rows[i].role_title)}
                inquirer.prompt ([
                  {
                    type: 'list',
                    name: 'updateRole',
                    message: "Which role do you want to assign the selected employee?",
                    choices: roles //shows each role from roles table
                  }
                ])
                .then((answer) => {
                  let chosenRole = answer.updateRole
                    for (let i=0; i < rows.length; i++) {
                      if (chosenRole === rows[i].role_title) {
                        roleId.push(rows[i].role_id)   // Role id that will be used for sql update
                            let sqlProcedure =
                            `UPDATE employees
                            SET role_id = ${roleId}
                            WHERE id = ${emplId}`;
                            connection.promise().query(sqlProcedure)
                            console.log("=============================================================");
                            console.log("                                                            ");
                            console.log(`!----- ${chosenEmpl} updated: New Role is ${chosenRole} -----!`)
                            console.log("                                                            ");
                            viewAllEmpl()

                      }                   
                  }

              })
            })       
          
          }




        }
     })
  })


}


    // updateEmpl: 
    // [
    //     {
    //         type: 'list',
    //         name: 'updateEmplName',
    //         message: 'Which employee do you want to update?',
    //         validate: function(answer){
    //             if(!isNaN(answer)) return "Only use letters.";
    //             else return true;
    //         }
    //     },
    //     {
    //         type: 'list',
    //         name: 'updateEmplRole',
    //         message: 'What is the last name of the new employee?',
    //         validate: function(answer){
    //             if(!isNaN(answer)) return "Only use letters.";
    //             else return true;
    //         }
    //     },

    // ],

module.exports = {askUser}