const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const expresslayouts = require('express-ejs-layouts');

// Load env vars
dotenv.config({ path: './config/config.env' })

// Conect Database
connectDB();

// Route files
const bands = require('./routes/bands');
const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// File uploading
app.use(fileupload());


// Sanitize data
app.use(mongoSanitize());

// Set static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/bands', bands);
app.use('/auth', auth);
app.use('/user', user);


// Error handler must be placed after above routes because routes are
// used in a linear order, therefore error handler needs to catch error from routes above
app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: true })); 

// EJS
app.use(expresslayouts);
app.set("view engine", "ejs");


// App.get gets the pathway that is added
// Renders a view and sends the rendered HTML string to the client
app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/contact', (req, res) => res.render('contact'));
app.post('/register', (req, res) => res.redirect('/'));
app.get('/profile', (req, res) => res.render('profile'));
app.get('/bandregister', (req, res) => res.render('bandregister'));
app.post('/bandregister', (req, res) => res.redirect('/'));

//app.get('/bands', (req,res) => res.render('/bands'));
//app.post('/auth/register', (req, res) => );
//app.get('/dashboard', (req, res) => res.render('dashboard'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandles promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});