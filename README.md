# eManage
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description
Command-line application to manage a company's employee database, using Node.js, Inquirer, Express, and MySQL.

## Table of Contents
[1. Installation](#installation)

[2. Usage](#usage)

[3. Demo](#demo)

[4. Contributing](#contributing)

[5. Questions](#questions)

[6. License](#license)

[7. Screenshots](#screenshots)

[8. Credits](#credits)

<br></br>

## Installation 
The application has dependencies (see package.json file). Before using the application, install npm modules.

```bash
npm install
```

## Usage 
The application will be invoked by using the following command:

```bash
node index.js
```

```
Then a command-line application will appear.

- The business owner (the user) will be able to view and manage the departments, roles, and employees in the company.

- When the user starts the application, then the user is presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role. 

- When the user chooses to view all departments, then the user is presented with a formatted table showing department names and department ids.

- When the user chooses to view all roles, then the user is presented with the job title, role id, the department that role belongs to, and the salary for that role.

- When the user chooses to view all employees, then the user is presented with a formatted table showing employee data, including employee ids, first name, last names, job titles, departments, salaries, and managers thtat the employees report to. 

- When the user chooses to add a department, then the user is prompted to enter the name of the department and that department is added to the database.

- When the user chooses to add a role, then the user is prompted to enter the name, salary, and department for the role and that role is added to the database. 

- When the user chooses to add an employee, then the user is prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database. 

- When the user chooses to update an employee role, then the user is prompted to select an employee to update their new role and this information is updated in the database.

```

## Demo
[Link for demo video](x) (Length of video: x minutes and x seconds)

The video is also within the assets folder.

A walkthrough video demonstrates: 
- xyz
- xyz
- xyz


## Contributing 
Contributions are welcomed for future versions with features such as:
- xyz
- additional enhancements

For all contributions, please refer to [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) for contributing guidelines.


## Questions
Interested in seeing my other work?

Check out my GitHub account: [mewing0328](https://github.com/mewing0328).

If you have additional questions, please reach me at [masandraewing@gmail.com](mailto:masandraewing@gmail.com).

## License 
eManage project is covered by MIT license. 

 To view the most current and full license description in opensource.org, click on the license name below.  

 [![MIT}](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

 ## Screenshots 
Utilized Visual Studio Code

1. Demo of 

    <img src="./assets/" style="width:30rem">

2. xyz

    <img src="./assets/" style="width:30rem">

3. xyz

    <img src="./assets/" style="width:30rem">

4. xyz

    <img src="./assets/" style="width:30rem">

5. xyz

    <img src="./assets/" style="width:30rem">

6. xyz

    <img src="./assets/" style="width:30rem">


## Credits
Credit for tutorials and guides I utilized in my code

[npm](https://docs.npmjs.com/creating-a-package-json-file): How to create a package.json file.

[npm](https://remarkablemark.org/blog/2021/08/28/how-to-create-npm-package-lockfile/): How to create a package-lock.json

[npm: mysql2](https://www.npmjs.com/package/mysql2): Promises examples.

[npm: chalk](https://www.npmjs.com/package/chalk?activeTab=readme): For styling the terminal console.log

[Inquirer Package](https://www.npmjs.com/package/inquirer/v/8.2.4#examples): To get user inputs

[MySQL2 Package](https://www.npmjs.com/package/mysql2): To connect to a MySQL database

[console.table Package](https://www.npmjs.com/package/console.table): To print MySQL rows to the console

[JSHint Package](https://www.npmjs.com/package/jshint): To detect errors and potential problems in JavaScript

[Recursive Key](https://assets.ctfassets.net/kdr3qnns3kvk/MlzrannWSaE6qWOsquqwa/34c2afb04f1e55aaa7c9f73b8c41ecf7/chapt06.pdf): How to reference the employeeID as the managerID

[w3resource.com](https://www.w3resource.com/sql-exercises/movie-database-exercise/joins-exercises-on-movie-database.php): Tutorials for different SQL examples

[mysqltutorial.org](https://www.mysqltutorial.org/mysql-nodejs/insert/): How to add a new row to a SQL table with an inquirer answer

[suvarna28 GitHub](https://github.com/suvarna28): utilized her approach for self referencing the employees table to get manager name. Altered her approach to use NATURAL JOIN as well

[stackoverflow.com](https://stackoverflow.com/questions/6054368/null-value-for-int-in-update-statement): Article discussing null as an INT data type so no need for quotes when assigning null to an array row

