const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = new Client({
    user: 'postgres',
    host: '13.126.237.141',
    database: 'postgres',
    password: 'postgres123',
    port: 5432,
});

const pool = new Pool({
    user: 'postgres',
    host: '13.126.237.141',
    database: 'postgres',
    password: 'postgres123',
    port: 5432,
});

client.connect();

app.post('/submit', (req, res) => {
    const { name, father_name, mother_name, gender, gotra, age, village, job_type } = req.body;

    const query = 'INSERT INTO users (name, father_name, mother_name, gender, gotra, age, village, job_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [name, father_name, mother_name, gender, gotra, age, village, job_type];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data to the database');
        } else {
            console.log('Data saved to the database');
            res.status(200).send('Data saved successfully');
        }
    });
});

app.get('/get_users', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        client.release();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const { Pool } = require('pg');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// // Use CORS middleware
// app.use(cors());

// // Replace these with your PostgreSQL connection details
// const pool = new Pool({
//     user: 'postgres',
//     host: '13.126.237.141',
//     database: 'postgres',
//     password: 'postgres123',
//     port: 5432,
// });

// // Endpoint to get user data
// app.get('/get_users', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM users');
//         const users = result.rows;
//         client.release();
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Serve static files (e.g., HTML, CSS, JS)
// app.use(express.static('public'));

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
