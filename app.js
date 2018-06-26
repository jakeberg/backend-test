const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const client = new Client({
    host: 'ec2-54-83-60-13.compute-1.amazonaws.com',
    port: 5432,
    user: 'rusydaqqqjugzx',
    password: '6535fa0b8e78d2784f86fca4e503302f445f1f504d6f651ec4fbb64aef8274be',
  })

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.post('/users', (req,res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps.'];
    client.query(text, values, (err, result) => {
        res.send(result.rows)
    });
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
    client.connect((err) => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('connected')
        }
      })
})