const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors());
app.use(fileUpload());

const client = new Client({

    //These pairs are for deploying to heroku
    // connectionString: process.env.DATABASE_URL,
    // ssl: true,

    //This value is all you need to run locally
    database: 'donors'

});

app.get("/", (req, res) => {
    res.json("This cheesedingle is runnin'")
});

app.get("/all", (req, res) => {
    client.query('SELECT * FROM donors', (err, result) => {
        res.send(result.rows);
    });
});

app.get('/groups', (req, res) => {
    client.query('SELECT * FROM groups', (err, result) => {
        res.send(result.rows)
    })
})

app.post('/addgroup', (req, res) => {
    let group_name = req.body.group_name;
    let bio = req.body.bio;

    const text = 'INSERT INTO groups (group_name, bio) VALUES ($1, $2) RETURNING *';
    const values = [group_name, bio];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0])
        res.send('Your group was registered')
    })
})


app.post('/adddonor', (req, res) => {
    let name = req.body.name;
    let phone = parseInt(req.body.phone);
    let address = req.body.address;
    let manager = req.body.manager;
    let pickup_date = req.body.date.slice(0,10);
    let pickup_time = req.body.time;
    let days = req.body.days;

    console.log(name, phone, address, manager, pickup_date, pickup_time)
    console.log(days)

    const text = 'INSERT INTO donors (name, phone, address, manager, pickup_date, pickup_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, phone, address, manager, pickup_date, pickup_time];
    client.query(text, values, (err, result) => {
        console.log(err)
        console.log(result.rows[0])
        res.send('Your donor was added to the list!')
    });
});

const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log("app is running at port: ",  port)
    client.connect()
})