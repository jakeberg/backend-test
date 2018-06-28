const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.get('/users', (req, res) => {

    const text = 'INSERT INTO users (name, age, status) VALUES ($1, $2, $3) RETURNING *';
    const values = ['hello', 29, "status"];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    client.connect()
})