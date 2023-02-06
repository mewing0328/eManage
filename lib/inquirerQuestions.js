module.exports = {
    menu: [
        {
            type: 'list',
            name: 'menuAnswer',
            message: "What would you like to do?",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role'
            ]
        }
    ],
    department: [
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the department?',
            validate: function(answer){
                if(!isNaN(answer)) return "Only use letters.";
                else return true;
            }
        }
    ],
    role: [
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the role?',
            validate: function(answer){
                if(!isNaN(answer)) return "Only use letters.";
                else return true;
            }
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What is the salary of the role?',
            validate: function(answer){
                if(isNaN(answer)) return "Only use numbers.";
                else return true;
            }
        }
    ],

};