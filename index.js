const express = require('express');
const app = express();

const port = 5000;
const connectionString = 'mongodb+srv://exodio:13241324@cluster0.rspdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const mongoose = require('mongoose');

mongoose.connect(connectionString, { useNewUrlParser: true })
.then(() => console.log('DB Connected Successful!'))
.catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send("Home page");
});

app.listen(port);
app.listen(port);