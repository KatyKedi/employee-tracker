const inquirer = require('inquirer');
const express = require('express');
const router = express.Router();

router.use(require('./routes/index.js'));

// Prompt user
const promptUser = () => {
    // Utilize the inquirer package to prompt the user
    return inquirer.prompt([
        {
            type: 'list',
            name: 'initial',
            message: 'Please select from the following options:',
            choices: [
                'View all departments', 
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                "Update an employee's role"
            ]
        }
    ]).then(selection => {
        switch (selection.initial) {
            case 'View all departments':
                showDepartments();
                break;
            case 'View all roles':
                showRoles();
                break;
            case 'View all employees':
                showEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case "Update an employee's role":
                updateEmployee();
                break;
        }
    });
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter the name of the new department:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department name!');
                    return false;
                }
            } 
        }
    ]).then(department => {
        const dp_name = department.department;
        console.log(`Added ${dp_name} to the list of departments.`);
        promptUser();
    });
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the name of the new role:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the role name!');
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for this role:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the salary for this role!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Please enter the department id for this role:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department id for this role!');
                    return false;
                }
            }
        }
    ])
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the new employee:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name!");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name of the new employee:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's last night!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Please enter the role id for this employee:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the role id for this employee!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'manager_confirm',
            message: 'Do you have a manager id to add?'
        }
    ]).then(employeeData => {
        if (employeeData.manager_confirm) {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "Please enter the employee's manager id:",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter the manager id!');
                            return false;
                        }
                    }
                }
            ]).then(managerId => {
                employeeData.manager_id = managerId;
                return employeeData;
            });
        } else {
            employeeData.manager_id = null;
            return employeeData;
        }
    });
};

const updateEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id of the employee you want to update:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's id!");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Please enter the employee's new role id:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the new role id!");
                    return false;
                }
            }
        }
    ]).then(employeeUpdate => {
        
    })
}

const init = () => {
    promptUser();
}

module.exports = init;