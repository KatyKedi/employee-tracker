const db = require('./db/connection');
const init = require('./index');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    init();
});