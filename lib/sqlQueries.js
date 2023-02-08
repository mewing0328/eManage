module.exports = {
    viewDepts:
        `SELECT dept_id AS 'ID', dept_name AS 'DEPARTMENT'
        FROM departments`,
    viewRoles:
        `SELECT role_id AS 'ID', role_title AS 'JOB TITLE', dept_name AS 'DEPARTMENT', salary AS 'SALARY'
        FROM roles
        NATURAL JOIN departments`,
    viewEmployees:
        `SELECT a.id AS 'ID', a.first_name AS 'FIRST NAME', a.last_name AS 'LAST NAME', roles.role_title AS 'JOB TITLE', roles.salary AS 'SALARY', departments.dept_name AS 'DEPARTMENT', CONCAT(b.first_name,' ',  b.last_name) as MANAGER
        FROM employees a
        NATURAL JOIN roles
        NATURAL JOIN departments
        LEFT JOIN employees b ON a.manager = b.id`,
    departments:
        `SELECT * 
        FROM departments`,
    departmentId:
        `SELECT sum(salary) AS BUDGET
        FROM roles
        WHERE dept_id = (?)`,
    addDept:
        `INSERT INTO departments (dept_name)
        VALUES (?)`,
    addRole:
        `INSERT INTO roles (role_title, salary, dept_id)
        VALUES (?, ?, ?)`,
    roles:
        `SELECT * 
        FROM roles`,
    managers: 
        `SELECT id, CONCAT(first_name, ' ', last_name) AS mgrName, role_id, manager 
        FROM employees`,
    addEmployee:
        `INSERT INTO employees (first_name, last_name, role_id, manager)
        VALUES (?, ?, ?, ?)`,
    employees:
        `SELECT id, CONCAT(first_name, ' ', last_name) AS emplName, role_id, manager 
        FROM employees`,
}