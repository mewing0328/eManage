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
                'Update Employee Role',
                'Close Application'
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
};