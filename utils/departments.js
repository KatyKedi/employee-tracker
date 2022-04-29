const db = require('../db/connection');

// Get all departments
const showDepartmentsQuery = () => {
    const sql = 
    `SELECT * FROM department`;
  
    db.query(sql, (rows) => {
        return rows;
    });
};

const addDepartmentQuery = (dp_name) => {
    const sql = 
    `INSERT INTO department (dp_name)
    VALUES (?)
    `;

    db.query(sql, dp_name, () => {
        return;
    });
};

module.exports = { showDepartmentsQuery, addDepartmentQuery };