const express = require('express');
const connectDB = require('./config/db');
const app = express();
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

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
