const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
