/**
 * Created by ranwahle on 05/09/2016.
 */
//index.js/
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),


    //  mongoose = require('mongoose'),
    pulsimClient = require('./mailer/pulsimClient');
FacebookStrategy = require('passport-facebook');

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work
var config = require('./config');
var app = express();
var jwt = require('express-jwt');
var https = require('https');

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
    throw 'Make sure you have AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET in your .env file'
}


var authenticate = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: process.env.AUTH0_CLIENT_SECRET,
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_CLIENT_ID,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['HS256']
});

//var configDB = require('./auth/config/database.js');

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

//===============PASSPORT===============

//This section will contain our work with Passport
//require('./auth/config/passport')(passport); // pass passport for configuration

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

console.log("===========================")
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


// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//===============ROUTES===============
require('./routes.js')(app, passport, express, authenticate);
//===============PORT=================
var port = process.env.PORT || config.port || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");



