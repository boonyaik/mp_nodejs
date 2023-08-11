const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const mysql = require('mysql');
// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'my_Db'
};

const connection = mysql.createConnection(dbConfig);


// Endpoint to fetch data and return as JSON
app.get('/data', (req, res) => {
    const query = 'SELECT timestamp_column as label, value FROM my_Table LIMIT 10';  // Adjust the query as needed

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }

        const labels = results.map(row => row.label);
        const data = results.map(row => row.value);

        res.json({labels,data});
    });
});



app.get('/', (req, res) => {
    // Send the HTML file as a response
    res.sendFile(path.join(__dirname, 'chart.html'));
});


app.get('/chartdata', (req, res) => {
    // Send the HTML file as a response
    res.sendFile(path.join(__dirname, 'chartdata.txt'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


