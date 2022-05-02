const db = require('./db/connection');
const promptUser = require('./index');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    promptUser();
});