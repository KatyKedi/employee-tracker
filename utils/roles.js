const db = require('../db/connection');

// Get all roles
const showRolesQuery = () => {
    const sql = 
    `SELECT emp_role.*, department.dp_name 
    AS department
    FROM emp_role
    LEFT JOIN department
    ON emp_role.department_id = department.id`;
  
    db.query(sql, () => {
        return;
    });
};

const addRoleQuery = (title, salary, department) => {
    const sql = 
    `INSERT INTO emp_role (title, salary, department_id)
    VALUES (?,?,?)
    `;

    db.query(sql, title, salary, department, (rows) => {
        return rows;
    });
};

module.exports = { showRolesQuery, addRoleQuery };