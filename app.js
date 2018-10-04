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
    connectionString: process.env.DATABASE_URL,
    ssl: true,

    //This value is all you need to run locally
    // database: "donors",

});

app.get("/", (req, res) => {
    res.json("This cheesedingle is runnin'")
});

app.get("/all", (req, res) => {
    client.query('SELECT * FROM donors', (err, result) => {
        res.send(result.rows);
    });
});

app.get("/donation_volunteer", (req, res) => {
    client.query('SELECT * FROM donors', (err, result) => {
        result.rows
    });
});

app.get('/volunteers', (req, res) => {
    client.query('SELECT * FROM volunteers', (err, result) => {
        console.log(result.rows)
        res.json(result.rows)
    })
})

app.get('/home', (req, res) => {

    client.query("SELECT * FROM donors", (err, donors) => {
        client.query("SELECT * FROM volunteers", (err, volunteers) => {

            donors.rows.forEach(donor => {

                let pickupDays = [];
                for (let day in donor.pickup_days) {
                    if (donor.pickup_days[day]) {
                        pickupDays.push(day);
                    }
                }

                let daysWithWorkers = { Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] }
                volunteers.rows.forEach(volunteer => {
                    for (let day in volunteer.days_available) {
                        if (volunteer.days_available[day]) {
                            let dayPlaceholder = day;
                            if (pickupDays.includes(dayPlaceholder)) {
                                let insert = daysWithWorkers[dayPlaceholder];
                                daysWithWorkers[dayPlaceholder] = [...insert, volunteer.name];
                            }

                        }
                    }
                });

                donor.pickupDays = pickupDays;
                donor.days_with_workers = daysWithWorkers;
            });

            res.send(donors.rows)
        })
    })
})

app.post('/addvolunteer', (req, res) => {
    let volunteer_name = req.body.volunteer_name;
    let phone = parseInt(req.body.phone);
    let email = req.body.email;
    let days = JSON.stringify(req.body.days);

    const text = 'INSERT INTO volunteers (name, phone, days_available, email) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [volunteer_name, phone, days, email];
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result.rows[0])
    })
})


app.post('/adddonor', (req, res) => {
    let name = req.body.name;
    let phone = parseInt(req.body.phone);
    let address = req.body.address;
    let manager = req.body.manager;
    let pickup_days = JSON.stringify(req.body.days);

    const text = 'INSERT INTO donors (name, phone, address, manager, pickup_days) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, phone, address, manager, pickup_days];
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result.rows[0])
    });
});

app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const text = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result.rows[0])
    });
});

app.get('/users', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    client.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result.rows)
    });
});


const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log("app is running at port: ", port)
    client.connect()
})