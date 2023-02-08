const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;

const connection = require('../config/connection');
const inquirerQuestions = require('./inquirerQuestions');
const sqlQuery = require('./sqlQueries');

const askUser = () => {
  inquirer.prompt(inquirerQuestions.menu)
  .then((answer) => {
      if (answer.menuAnswer === 'View All Departments') { viewAllDepts() }
      else if (answer.menuAnswer === 'View All Employees'){ viewAllEmpl(); }
      else if (answer.menuAnswer === 'View All Roles'){ viewAllRoles(); }
      else if (answer.menuAnswer === 'Add Department'){ addDept(); }
      else if (answer.menuAnswer === 'Add Role'){ addRole(); }
      else if (answer.menuAnswer === 'Add Employee'){ addEmployee(); }
      else if (answer.menuAnswer === 'Update Employee Role'){ updateEmplRole(); }
      else if (answer.menuAnswer === 'View Budget By Department'){ viewDeptBudget(); }
      else if (answer.menuAnswer === 'Close Application'){
        log(chalk.red("==========================================================================================================="));
        log("");
        log(chalk.black.bgRedBright('Goodbye!'))
        log("");
        log(chalk.red("==========================================================================================================="));
        connection.end;
      } else {log('BUG AT askUser function'); }
    });
};


// VIEW ALL DEPARTMENTS
const viewAllDepts = () => {
  let sqlProcedure = sqlQuery.viewDepts;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        log(chalk.cyan("==========================================================================================================="));
        log("");
        console.table(rows);
        log("");
        log(chalk.cyan("==========================================================================================================="));     
      })
      .catch(console.table)
      .then (askUser);
};
  

// VIEW ALL ROLES
const viewAllRoles = () => {
  let sqlProcedure = sqlQuery.viewRoles;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        log(chalk.cyan("==========================================================================================================="));
        log("");
        console.table(rows);
        log("");
        log(chalk.cyan("==========================================================================================================="));  
      })
      .catch(console.table)
      .then (askUser);
};


// VIEW ALL EMPLOYEES
const viewAllEmpl = () => {
  let sqlProcedure = sqlQuery.viewEmployees;
  connection.promise().query(sqlProcedure)
      .then ( ([rows, fields]) => {
        log(chalk.cyan("==========================================================================================================="));
        log("");
        console.table(rows);
        log("");
        log(chalk.cyan("==========================================================================================================="));  
      })
      .catch(console.table)
      .then (askUser);
};

// VIEW DEPARTMENT BUDGETS
const viewDeptBudget = () => {
  let deptId = [];
    // GET the list of departments from database
    connection.promise().query(sqlQuery.departments)
    .then ( ([rows]) => {
      const departments = []; //created a blank array for departments
      // departments table utilizes dept_name as the name of departments
      for (let i=0; i < rows.length; i++) {departments.push(rows[i].dept_name)}
      inquirer.prompt ([
        {
          type: 'list',
          name: 'deptChosen',
          message: "Which department do you want to view total budget?",
          choices: departments //shows each department from departments table
        }
      ])
      .then((answer) => {
        let deptName = answer.deptChosen
          for (let i=0; i < rows.length; i++) {
            if (deptName === rows[i].dept_name) {
              deptId.push(rows[i].dept_id)   // Department id that will be used for sql update
                let sqlProcedure = sqlQuery.departmentId;
                connection.promise().query(sqlProcedure, deptId)
                .then ( ([rows, fields]) => {
                  log(chalk.cyan("==========================================================================================================="));
                  log(`!----- Total budget for ${answer.deptChosen} department -----!`);
                  console.table(rows);
                  log("");
                  log(chalk.cyan("==========================================================================================================="));  
                })
                .catch(console.table)
                viewAllEmpl()
            }                   
          }
      })   
  })
}

// ADD DEPT
const addDept = () => {
  inquirer.prompt(inquirerQuestions.department)
  .then((answer) => {
  let response = answer.newDept;
  let sqlProcedure = sqlQuery.addDept;
  connection.promise().query(sqlProcedure, response)
    log(chalk.cyan("==========================================================================================================="));
    log("");
    log(`!----- New department added: ${response} -----!`)
    log("");
    log(chalk.cyan("==========================================================================================================="));  
    viewAllDepts()
  })
};


// ADD ROLE
const addRole = () => {  
  inquirer.prompt(inquirerQuestions.role)
  .then((answers) => {
    const newRoleArray = [answers.newRole, answers.newSalary]
    // GET the list of departments from database
    connection.promise().query(sqlQuery.departments)
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
            let sqlProcedure = sqlQuery.addRole;
            connection.promise().query(sqlProcedure, newRoleArray)
            log(chalk.cyan("==========================================================================================================="));
            log("");
            log(`!----- New role added: ${answers.newRole} -----!`)
            log("");
            log(chalk.cyan("==========================================================================================================="));  
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
      connection.promise().query(sqlQuery.roles)
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
                    connection.promise().query(sqlQuery.managers)
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
                          let sqlProcedure = sqlQuery.addEmployee;
                          connection.promise().query(sqlProcedure, newEmployeeArray)
                          log(chalk.cyan("==========================================================================================================="));
                          log("");
                          log(`!----- New employee added: ${answers.newEmpFirst} ${answers.newEmpLast} -----!`)
                          log("");
                          log(chalk.cyan("==========================================================================================================="));  
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
  connection.promise().query(sqlQuery.employees)
  .then ( ([rows]) => {
    const employees = []; //created a blank array for employees
    // employees table utilizes name of first_name and last_name as the name of employees
    for (let i=0; i < rows.length; i++) {employees.push(rows[i].emplName)}
    inquirer.prompt ([
      {
        type: 'list',
        name: 'updateRoleEmplName',
        message: "Which employee needs to be changed?",
        choices: employees //shows each employee from employees table
      }
    ])
    .then((answer) => {
      let chosenEmpl = answer.updateRoleEmplName
        for (let i=0; i < rows.length; i++) {
          if (chosenEmpl === rows[i].emplName) {
            emplId.push(rows[i].id)   // Employee id that will be used for sql update
          
              // GET the list of roles from database
              connection.promise().query(sqlQuery.roles)
              .then ( ([rows]) => {
                const roles = []; //created a blank array for roles
                // roles table utilizes role_title
                for (let i=0; i < rows.length; i++) {roles.push(rows[i].role_title)}
                inquirer.prompt ([
                  {
                    type: 'list',
                    name: 'updateRole',
                    message: `Which role do you want to assign ${chosenEmpl}?`,
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
                            log(chalk.cyan("==========================================================================================================="));
                            log("");
                            log(`!----- ${chosenEmpl} updated: New Role is ${chosenRole} -----!`)
                            log("");
                            log(chalk.cyan("==========================================================================================================="));  
                            viewAllEmpl()
                      }                   
                  }
              })
            })       
          }
        }
     })
  })
};




module.exports = {askUser}