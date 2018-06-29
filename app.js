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

app.post('/adddonor', (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let address = req.body.address;
    let manager = req.body.manager;
    let pickup_date = req.body.date;
    let pickup_time = req.body.time;

    let phoneNumber = parseInt(phone)

    console.log(req.body, "phone:", phoneNumber)

    const text = 'INSERT INTO donors (name, phone, address, manager, pickup_date, pickup_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, phoneNumber, address, manager, pickup_date, pickup_time];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });

    res.status(201)
    res.send("it's working")
});

app.listen( process.env.PORT || 3000, () => {
    console.log("app is running")
    client.connect()
})