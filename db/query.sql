-- VIEW ALL DEPARTMENTS
SELECT dept_id AS 'ID', dept_name AS 'DEPARTMENT'
FROM departments;

-- VIEW ALL ROLES
SELECT role_id AS 'ID', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary AS 'SALARY'
FROM roles
NATURAL JOIN departments;

-- VIEW ALL EMPLOYEES
SELECT a.id AS 'ID', a.first_name AS 'FIRST NAME', a.last_name AS 'LAST NAME', roles.role_title AS 'JOB TITLE', roles.salary AS 'SALARY', departments.dept_name AS 'DEPARTMENT', CONCAT(b.first_name,' ',  b.last_name) as MANAGER
FROM employees a
NATURAL JOIN roles
NATURAL JOIN departments
LEFT JOIN employees b ON a.manager = b.id;


-- ADD DEPARTMENT
  -- for the sqlProcedure parameter for connection query
INSERT INTO departments (dept_name)
VALUES (?);

-- ADD ROLE
  -- gets departments for the inquirer list
SELECT * FROM departments 
  -- for the sqlProcedure parameter for connection query
INSERT INTO roles (role_title, salary, dept_id)
VALUES (?, ?, ?);

-- ADD EMPLOYEE 
  -- gets roles id for the inquirer list
SELECT * FROM roles
  -- gets manager id list for the inquirer list
SELECT id, CONCAT(first_name, ' ', last_name) AS mgrName, role_id, manager 
FROM employees

  -- for the sqlProcedure parameter for connection query
INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES (?, ?, ?, ?);


-- UPDATE ROLE OF EMPLOYEE
  -- gets employee id for the inquirer list
SELECT id, CONCAT(first_name, ' ', last_name) AS emplName, role_id, manager 
FROM employees

  -- gets the roles id for the inquirer list
SELECT * FROM roles

  -- for the sqlProcedure parameter for connection query
UPDATE employees
SET role_id = (?)
WHERE id = (?);

