const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("cheesedingle")
});

app.listen( process.env.PORT || 3000, () => {
    console.log("this is working")
})