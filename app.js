const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const client = new Client({

    //These pairs are for deploying to heroku
    connectionString: process.env.DATABASE_URL,
    ssl: true,

    //This value is all you need to run locally
    // database: 'users'

  });

app.get("/", (req, res) => {
    res.json("This cheesedingle is runnin'")
});

app.get("/all", (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let status = req.body.status;

    const text = 'INSERT INTO users (name, phone, address, manager, pickup_time, pickup_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = ["dairy farm", 1234567, "1234 Milky Way", "Senor Queso", "04:05 AM", "08-Jan-1999"];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });

    res.status(201)
    res.send("it's working")
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    client.connect()
})