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

router.post('/employees', ({ body }, res) => {
    const sql = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)
    `;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update an employee's information
router.put('/employees/:id', (req, res) => {
    const sql = 
    `UPDATE employee 
    SET role_id = ? 
    WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
            message: 'Employee not found'
            });
        } else {
            res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
            });
        }
    });
});

module.exports = router;