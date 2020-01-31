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
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

const session = require('express-session');
const flash = require('connect-flash');

const { ensureAuthenticated } = require('./config/auth');


require('./config/passport')(passport);

// Load env vars
dotenv.config({ path: './config/config.env' })

// Conect Database
connectDB();

// Route files
const bands = require('./routes/bands');
const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());


// Sanitize data
app.use(mongoSanitize());

app.use(express.urlencoded({ extended: false }));


// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

app.use(flash());

// Set static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/bands', bands);
app.use('/auth', auth);
app.use('/user', user);

// Error handler must be placed after above routes because routes are
// used in a linear order, therefore error handler needs to catch error from routes above
app.use(errorHandler);

app.use(bodyParser.json());
// Body parser
app.use(bodyParser.urlencoded({ extended: true })); 

// EJS
// Must be above the set view engine
app.set("view engine", "ejs");


// App.get gets the pathway that is added
// Renders a view and sends the rendered HTML string to the client
app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })(req, res, next);
});



app.get('/register', (req, res) => res.render('register'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/posts', ensureAuthenticated, (req, res) => res.render('posts'));

app.post('/register', (req, res) => {
    //const { name, email, password, password2 } = req.body;
    //console.log(name + email + password);
    //const info = req.body;
    res.redirect('login');
});

app.get('/logout', function(req, res) {
    console.log('LOGGED OUT');
    req.logout();
    /*
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        // The response should indicate that the user is no longer authenticated.
        return res.send({ authenticated: req.isAuthenticated() });
      });

      */

    res.redirect('login');
});
//app.post('/bands', (req, res) => res.redirect('home'));

//Send Email
app.post('/send', (req, res) => {
    console.log(req.body);
});



app.get('/me', (req, res) => res.render('me'));
app.get('/bandregister', ensureAuthenticated, (req, res) => res.render('bandregister'));

// Only tmp to see if axios works
app.post('/bandregister', (req, res) => res.redirect('bands'));

app.get('/bands', function(req, res){
    res.render('bands');
});
/*
app.get('/dashboard', (req, res) =>
 res.render('dashboard', {
     user: req.user.name
 }));
*/

 app.get('/dashboard', ensureAuthenticated, function(req, res) {
    res.render('dashboard', {
        name: req.user.name,
        id: req.user.id
    });
 });
 


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandles promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
