-- VIEW ALL DEPARTMENTS
SELECT dept_id AS 'ID', dept_name AS 'DEPARTMENT'
FROM departments;

-- VIEW ALL ROLES
SELECT role_id AS 'ID', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary AS 'SALARY'
FROM roles
NATURAL JOIN departments;

-- VIEW ALL EMPLOYEES
SELECT id AS 'ID', first_name AS 'FIRST NAME', last_name AS 'LAST NAME', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary 'SALARY', manager AS 'MANAGER'
FROM employees
NATURAL JOIN roles
NATURAL JOIN departments;

-- ADD DEPARTMENT
INSERT INTO departments (dept_name)
VALUES (?);

-- ADD ROLE
INSERT INTO roles (role_title, salary, dept_id)
VALUES (?);



-- TO DO: Figure out how to join the manager

