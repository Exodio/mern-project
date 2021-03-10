const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { User } = require('./models/user');

const port = 5000;

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected Successful!'))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.json( {"Backend": "Hello!"} );
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, data) => {
        if (err) return res.json( {success: false, err });
        
        res.status(200).json({ success: true, userData: data, });
    });

});

app.listen(port);