const db = require('../db/connection');

// Get all departments
const showDepartmentsQuery = () => {
    const sql = 
    `SELECT * FROM department`;
  
    db.query(sql, (error, result) => {
        if (error) throw error;
        return result;
    });
};

const addDepartmentQuery = (dp_name) => {
    const sql = 
    `INSERT INTO department (dp_name)
    VALUES (?)
    `;

    db.query(sql, dp_name, (error, result) => {
        if (error) throw error;
        return;
    });
};

module.exports = { showDepartmentsQuery, addDepartmentQuery };