const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// const client = new Client({
//     host: 'ec2-54-83-60-13.compute-1.amazonaws.com',
//     port: 5432,
//     user: 'rusydaqqqjugzx',
//     password: '6535fa0b8e78d2784f86fca4e503302f445f1f504d6f651ec4fbb64aef8274be',
//   })

const client = new Client();

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.post('/users', (req,res) => {
    console.log(req.body)
    const text = "INSERT INTO users(name, age, status) VALUES ('jake', 29, 'testing')"
    client.query(text, (err, result) => {
        res.send(result.rows)
    });
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    client.connect();
})