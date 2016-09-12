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
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//===============PASSPORT===============

//This section will contain our work with Passport


//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
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

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//===============ROUTES===============

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//This section will hold our Routes
app.use('/', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
// app.get('/', function(req, res) {
//     res.send('hello world');
// });

app.get('/contacts', function(req, res){
    var dataAccess = require('./dataAccess');
    dataAccess.getContacts(function(err, results){
        console.log('error', err);
        console.log('results', results);
        res.send(results);
    });
   // res.send( [{firstName: 'Ran', lastName: 'Wahle'
   // , eMail: 'ran.wahle@gmail.com'}]);
});
app.post('/contacts', function(req, res){
    try {
      var dataAccess = require('./dataAccess');

        dataAccess.newContact(req.body);
    }
    catch(err){
        console.error(err);
    }
    res.send();

});

//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");