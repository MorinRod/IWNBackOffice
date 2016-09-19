/**
 * Created by ranwahle on 05/09/2016.
 */
//index.js/
var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
   mongoose = require('mongoose'),
    FacebookStrategy = require('passport-facebook');

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

var configDB = require('./auth/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

//===============PASSPORT===============

//This section will contain our work with Passport
require('./auth/config/passport')(passport); // pass passport for configuration

//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// // Configure express to use handlebars templates
// var hbs = exphbs.create({
//     defaultLayout: 'main', //we will be creating this layout shortly
// });
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//===============ROUTES===============
require('./routes.js')(app, passport, express);
//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");