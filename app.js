const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// const client = new Client({
//     host: 'ec2-184-73-240-228.compute-1.amazonaws.com',
//     port: 5432,
//     user: 'ciwnpufebecnav',
//     password: '3b85f66a4ec80861f06c3944a3d4347242a3256d0e086a09af6b2889eb9af0e8',
//   })

//   const client = new Client({
//     Host: 'ec2-184-73-240-228.compute-1.amazonaws.com',
//     Database: 'd5d5ijhhn9te54',
//     User: 'ciwnpufebecnav',
//     Port: 5432,
//     Password: '3b85f66a4ec80861f06c3944a3d4347242a3256d0e086a09af6b2889eb9af0e8',
//     URI: 'postgres://ciwnpufebecnav:3b85f66a4ec80861f06c3944a3d4347242a3256d0e086a09af6b2889eb9af0e8@ec2-184-73-240-228.compute-1.amazonaws.com:5432/d5d5ijhhn9te54',
//     HerokuCLI: 'heroku pg:psql postgresql-cubic-50344 --app team-cheese-backend' 
//   })

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.post('/users', (req, res) => {
    console.log("Endpoint hit")
    console.log(req.body)
    const text = 'INSERT INTO users (name, age, status) VALUES ($1, $2, $3) RETURNING *';
    const values = ['hello', 29, "status"];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    // client.connect()
})