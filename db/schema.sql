DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT KEY,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id)
  REFERENCES departments(dept_id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager INT REFERENCES employees(id),
  FOREIGN KEY (role_id)
  REFERENCES roles(role_id)
  ON DELETE SET NULL
);