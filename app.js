const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');

app.use(express.json());
app.use(cors());


const client = new Client({
    database: 'social-media'
});

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.json(result.rows);
    });
});

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
})