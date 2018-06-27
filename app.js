const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const client = new Client({
    Host: 'ec2-54-83-60-13.compute-1.amazonaws.com',
    Database: 'd5fv5tvq2hd8eo',
    User: 'rusydaqqqjugzx',
    Port: 5432,
    Password: '6535fa0b8e78d2784f86fca4e503302f445f1f504d6f651ec4fbb64aef8274be',
    URI: 'postgres://rusydaqqqjugzx:6535fa0b8e78d2784f86fca4e503302f445f1f504d6f651ec4fbb64aef8274be@ec2-54-83-60-13.compute-1.amazonaws.com:5432/d5fv5tvq2hd8eo',
    HerokuCLI: 'heroku pg:psql postgresql-cubed-37599 --app team-cheese-backend' 
  })


app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.post('/users', (req, res) => {
    console.log("Endpoint hit")
    console.log(req.body)
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['hello', "status"];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    client.connect()
})