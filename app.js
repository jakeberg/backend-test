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

app.post('/users', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let status = req.body.status;

    const text = 'INSERT INTO users (name, age, status) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, age, status];

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