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
INSERT INTO departments (dept_name)
VALUES (?);

-- ADD ROLE
  -- gets departments for the inquirer list
SELECT * FROM departments 

INSERT INTO roles (role_title, salary, dept_id)
VALUES (?, ?, ?);

-- ADD EMPLOYEE 




