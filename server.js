const express = require('express');
const dotenv = require('dotenv');

// Route files
const bands = require('./routes/api/bands');

// Load env vars
dotenv.config({ path: './config/config.env' })

const connectDB = require('./config/db');

const app = express();

// Mount routes
app.use('/api/v1/bands', bands);

const path = require('path');
const bodyParser = require('body-parser')

// Conect Database
connectDB();

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
