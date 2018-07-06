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
    database: "donors"

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

app.post('/addvolunteer', (req, res) => {
    let volunteer_name = req.body.volunteer_name;
    let phone = parseInt(req.body.phone);
    let email = req.body.email;
    let days = JSON.stringify(req.body.days);
    console.log(volunteer_name, phone, email, days)

    const text = 'INSERT INTO volunteers (name, phone, email, days_available) VALUES ($1, $2, $3) RETURNING *';
    const values = [volunteer_name, phone, email, days];
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result.rows[0])
        res.send('Your group was registered')
    })
})


app.post('/adddonor', (req, res) => {
    let name = req.body.name;
    let phone = parseInt(req.body.phone);
    let address = req.body.address;
    let manager = req.body.manager;
    let pickup_date = req.body.date;
    let pickup_time = req.body.time;
    // let days = req.body.days;

    const text = 'INSERT INTO donors (name, phone, address, manager, pickup_date, pickup_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, phone, address, manager, pickup_date, pickup_time];
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result.rows)
        res.send('Your donor was added to the list!')
    });
});

const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log("app is running at port: ",  port)
    client.connect()
})