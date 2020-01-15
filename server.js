const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Load env vars
dotenv.config({ path: './config/config.env' })

const connectDB = require('./config/db');

// Route files
const bands = require('./routes/api/bands');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const errorHandler = require('./middleware/error');

// Conect Database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Mount routes
app.use('/api/v1/bands', bands);
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);


// Error handler must be placed after above routes because routes are
// used in a linear order, therefore error handler needs to catch error from routes above
app.use(errorHandler);

const path = require('path');
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use('/', (req, res) => res.render('dashboard'));
app.use('/api/users', (req, res) => res.send('home'));
app.get('/signin', (req, res) => res.send('/signin'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandles promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});