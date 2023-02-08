INSERT INTO departments (dept_name)
VALUES  ("Executive Leadership"),
        ("Business Development"),
        ("Project Management"),
        ("Finance"),
        ("Human Resources");

INSERT INTO roles (role_title, salary, dept_id)
VALUES ("Chief Executive Officer", 500000, 1),
       ("Chief Operations Officer", 350000, 1),
       ("Chief Financial Officer", 300000, 1),
       ("Chief Human Resources Officer", 250000, 1),
       ("Sales Lead", 150000, 2),
       ("Business Analyst", 90000, 2),
       ("Project Manager", 100000, 3),
       ("Project Coordinator", 75000, 3),
       ("Finance Manager", 120000, 4),
       ("Accountant", 95000, 4),
       ("Human Resources Manager", 100000, 5),
       ("Compliance Analyst", 80000, 5);
       

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES  ("Gita", "Theodora", 1, null), -- CEO
        ("Kylie", "Augustine", 2, 1), -- COO
        ("Walton", "Michele", 3, 1), -- CFO
        ("Vickie", "Randolph", 4, 1), -- CHRO
        ("Agatha", "Rita", 5, 2),
        ("Mirabella", "Bohdana", 6, 5),
        ("Puck", "Amelina", 7, 2),
        ("Wynona", "Kade", 8, 7),
        ("Sarah", "Lourd", 9, 3),
        ("Linnette", "Jo", 10, 9),
        ("Cree", "Den", 11, 4),
        ("Virgee", "Wilburn", 12, 11);
