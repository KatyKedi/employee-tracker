const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all employees
router.get('/employees', (req, res) => {
    const sql = 
    `SELECT employee.*, emp_role.title 
    AS role 
    FROM employee
    LEFT JOIN emp_role
    ON employee.role_id = emp_role.id`;
  
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/employees', (req, res) => {
    const sql = 
    `INSERT INTO employee
    VALUES (?,?,?)
    `
})

module.exports = router;