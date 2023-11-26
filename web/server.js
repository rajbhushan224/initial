const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

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
    const { name, age, ctc, department } = req.body;

    const query = 'INSERT INTO users (name, age, ctc, department) VALUES ($1, $2, $3, $4)';
    const values = [name, age, ctc, department];

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

