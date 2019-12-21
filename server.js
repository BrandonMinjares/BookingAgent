const express = require('express');
const dotenv = require('dotenv');

// Load en vars
dotenv.config({ path: './config/config.env' })

const connectDB = require('./config/db');

const app = express();

const path = require('path');
const bodyParser = require('body-parser')

// Conect Database
connectDB();


// Created test routes
app.get('/api/v1/bands/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Get band ${req.params.id}`});
});

app.get('/api/v1/bands', (req, res) => {
    res.status(200).json({ success: true, msg: "show all bands"});
});

app.post('/api/v1/bands', (req, res) => {
    res.status(200).json({ success: true, msg: "Create new band"});
});

app.put('/api/v1/bands/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update band ${req.params.id}`});
});

app.delete('/api/v1/bands/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete band ${req.params.id}`});
});



//


app.use(express.json({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')))


const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs")

app.use(urlencodedParser)
app.use(bodyParser.json())

app.use('/', (req, res) => res.render('dashboard'));
app.use('/api/users', (req, res) => res.send('home'));
app.get('/signin', (req, res) => res.send('/signin'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
