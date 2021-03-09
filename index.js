const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./models/user');

const port = 5000;
const connectionString = 'mongodb+srv://exodio:13241324@cluster0.rspdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected Successful!'))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userData) => {
        if (err) return res.json( {success: false, err });
        
        return res.status(200).json({ success: true });
    });

});

app.listen(port);