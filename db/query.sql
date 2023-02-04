-- Joins departments table by dept_id && Joins roles table by role_id
CREATE PROCEDURE view_all_employees
AS
SELECT id, first_name, last_name, role_title, dept_name, salary, manager
FROM employees
NATURAL JOIN roles
NATURAL JOIN departments
WHERE manager = employee.id
GO;

-- TO DO: Figure out how to join the manager