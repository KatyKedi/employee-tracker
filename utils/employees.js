const db = require('../db/connection');

// Get all employees
const showEmployeesQuery = () => {
    const sql = 
    `SELECT employee.*, emp_role.title 
    AS role 
    FROM employee
    LEFT JOIN emp_role
    ON employee.role_id = emp_role.id`;
  
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.table(result);
    });
};

const addEmployeeQuery = (first_name, last_name, role_id, manager_id) => {
    const sql = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)
    `;
    const params = [first_name, last_name, role_id, manager_id];

    db.query(sql, params, (error, result) => {
        if (error) throw error;
    });
};

// Update an employee's information
const updateEmployeeQuery = (role_id, id) => {
    const sql = 
    `UPDATE employee 
    SET role_id = ? 
    WHERE id = ?`;
    
    const params = [role_id, id];

    db.query(sql, params, (error, result) => {
        if (error) {
            console.log('Employee not found');
        } 
    });
};

module.exports = { showEmployeesQuery, addEmployeeQuery, updateEmployeeQuery };