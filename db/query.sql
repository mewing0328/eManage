-- Joins departments table by dept_id
-- Joins roles table by role_id
SELECT id, first_name, last_name, role_title, dept_name, salary, manager_id
FROM employees
NATURAL JOIN roles
NATURAL JOIN departments;

-- TO DO: Figure out how to join the manager_id