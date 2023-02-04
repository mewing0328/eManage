SELECT roles.role_title AS role_id, employees.first_name
FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id
ORDER BY roles.role_title;

