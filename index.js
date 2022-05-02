const inquirer = require('inquirer');
const db = require('./db/connection');
const { showDepartmentsQuery, addDepartmentQuery } = require('./utils/departments');
const { showRolesQuery, addRoleQuery } = require('./utils/roles');
const { showEmployeesQuery, addEmployeeQuery, updateEmployeeQuery } = require('./utils/employees');

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

const showDepartments = () => {
    showDepartmentsQuery();
    promptUser();
}

const showRoles = () => {
    showRolesQuery();
    promptUser();
}

const showEmployees = () => {
    showEmployeesQuery();
    promptUser();
}

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
        addDepartmentQuery(dp_name);
        console.log(`Added ${dp_name} to the list of departments.`);
        promptUser();
    });
};

const addRole = () => {
    db.query(`SELECT * FROM department`, (error, result) => {
        if (error) throw error;
        let departmentsArray = result.map(department => department.id)
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
                message: 'Please select from the following options:',
                choices: departmentsArray
            }
        ]).then(role => {
            const title = role.role;
            const salary = role.salary;
            const department_id = role.department_id;
            addRoleQuery(title, salary, department_id);
            console.log(`Added ${title} to the list of roles.`);
            promptUser();
        });
    });
};

const addEmployee = () => {
    db.query(`SELECT * FROM emp_role`, (error, result) => {
        const rolesArray = result.map(role => role.id);
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
                message: 'Please select the role id:',
                choices: rolesArray
            },
            {
                type: 'confirm',
                name: 'manager_confirm',
                message: 'Do you have a manager id to add?'
            }
        ]).then(employeeData => {
            const first_name = employeeData.first_name;
            const last_name = employeeData.last_name;
            const role_id = employeeData.role_id;
            const confirm = employeeData.manager_confirm;
            db.query(`SELECT * FROM employee`, (error, result) => {
                const employeeArray = result.map(employee => employee.id);
                if (confirm) {
                    return inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Please select the manager's id:",
                            choices: employeeArray
                        }
                    ]).then(managerId => {
                        const manager_id = managerId.manager_id;
                        addEmployeeQuery(first_name, last_name, role_id, manager_id);
                        console.log(`Added ${first_name} to the list of employees.`);
                        promptUser();
                    });
                } else {
                    const manager_id = null;
                    addEmployeeQuery(first_name, last_name, role_id, manager_id);
                    console.log(`Added ${first_name} to the list of employees.`);
                    promptUser();
                }
            });
        });
    });
};

const updateEmployee = () => {
    db.query(`SELECT * FROM emp_role`, (error, result) => {
        const rolesArray = result.map(role => role.id);
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
                type: 'list',
                name: 'role_id',
                message: "Please select the employee's new role id:",
                choices: rolesArray
            }
        ]).then(employeeUpdate => {
            const id = employeeUpdate.id;
            const role_id = employeeUpdate.role_id;
            updateEmployeeQuery(role_id, id);
            console.log('Updated employee');
            promptUser();
        })
    });
}

module.exports = promptUser;