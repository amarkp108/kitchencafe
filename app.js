const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite3 module
const cors = require('cors');

const app = express();
const port = 3002; // Change port number
app.post('/book-table', cors(), (req, res) => {
    // Your booking handling logic goes here
});

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY,
    dinners INTEGER,
    date TEXT,
    time TEXT,
    firstName TEXT,
    lastName TEXT,
    mobile TEXT,
    email TEXT
)`);

// Handle POST request to /book-table endpoint
app.post('/book-table', (req, res) => {
    const { Dinners, Date, time, 'f-name': firstName, 'l-name': lastName, mobile, email } = req.body;

    // Insert data into the database
    db.run(`INSERT INTO bookings (dinners, date, time, firstName, lastName, mobile, email) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [Dinners, Date, time, firstName, lastName, mobile, email], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({
            message: "Booking confirmed!"
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
