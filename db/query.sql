-- VIEW ALL DEPARTMENTS
SELECT dept_id AS 'ID', dept_name AS 'NAME'
FROM departments

-- Joins departments table by dept_id && Joins roles table by role_id
SELECT id, first_name, last_name, role_title, dept_name, salary, manager
FROM employees
NATURAL JOIN roles
NATURAL JOIN departments;

-- TO DO: Figure out how to join the manager

