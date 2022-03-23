const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all roles
router.get('/roles', (req, res) => {
    const sql = 
    `SELECT emp_role.*, department.dp_name 
    AS department
    FROM emp_role
    LEFT JOIN department
    ON emp_role.department_id = department.id`;
  
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

router.post('/roles', ({ body }, res) => {
    const sql = 
    `INSERT INTO emp_role (title, salary, department_id)
    VALUES (?,?,?)
    `;
    const params = [body.title, body.salary, body.department_id];

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

module.exports = router;