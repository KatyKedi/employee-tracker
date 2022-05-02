const db = require('../db/connection');

// Get all roles
const showRolesQuery = () => {
    const sql = 
    `SELECT emp_role.*, department.dp_name 
    AS department
    FROM emp_role
    LEFT JOIN department
    ON emp_role.department_id = department.id`;
  
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.table(result);
    });
};

const addRoleQuery = (title, salary, department_id) => {
    const sql = 
    `INSERT INTO emp_role (title, salary, department_id)
    VALUES (?,?,?)
    `;

    const params = [title, salary, department_id];

    db.query(sql, params, (error, result) => {
        if (error) throw error;
    });
};

module.exports = { showRolesQuery, addRoleQuery };