"use strict";
/**
 * Created by ranwahle on 13/09/2016.
 */


module.exports = function(app, passport, express, authenticate) {

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
        res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
        next();
    });
    app.use(authenticate);
    const clientUrl = '';

    console.log("========== exports =================")
//This section will hold our Routes


    app.use('/', express.static('client/dist'));
    app.use('/register', express.static('public'));
    app.use('/node_modules', express.static('node_modules'));


    app.get('/currentUser', function (req, response) {
        //todo:return user profile details

        response.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
    });

    app.get('/getUnsubscribedMails', function(req, res){
        var pulsimClient = require('./mailer/pulsimClient');
         pulsimClient.getUnsubscribedMails().then(function (result){
             console.log(result);
            res.send(result);

         }).catch(function(err) {
            res.send({error: err});
         });
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.send({});
    })

    app.get('/members-screen/contacts', function (req, res) {
        var dataAccess = require('./dataAccess');
        dataAccess.getContacts(function (err, results) {
            console.log('error', err);
            console.log('results', results);
            res.send(results);
        });
    });

    app.post('/members-screen/contacts', function (req, res) {
        console.log(req.body);
        
        try {
            var dataAccess = require('./dataAccess');

            dataAccess.newContact(req.body);
        }
        catch (err) {
            console.error(err);
        }
        res.send();

    });

    app.delete('/members-screen/contacts/:id',function(req,res){
        //console.log("------delete method----")
        try {
            var dataAccess=require('./dataAccess');
            dataAccess.deleteContact(function(err,results){
                console.log('error', err);
                res.send(results);
            },req.params.id);
        }
        catch(err){
            console.error(err)
        }
        res.send();
    });

    app.get('/payments/:id',function(req,res){
        var dataAccess = require('./dataAccess');
        //console.log('id is '+req.params.id);
        dataAccess.getPayments(function(err,results){
            console.log('error', err);
            //console.log('results', results);
            res.send(results);
        },req.params.id);
    });

    app.post('/payments',function(req,res){
        try {
            var dataAccess=require('./dataAccess');
            dataAccess.newPayment(req.body);
        }
        catch(err){
            console.error(err)
        }
        res.send();
    });

// send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

// handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }, function(req, res){
            console.log('callback', req, res);
        }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',

 passport.authenticate('google', {
        successRedirect: clientUrl +  '/?code=',
        failureRedirect: clientUrl + '/?code=error'
    }));




// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {

        let securityModule = require('./auth/securityModule');
        if (req.isAuthenticated() && securityModule.hasPermission(req.user)) {
            console.log('user', req.user);
            return next();
        }
        else {
            res.sendStatus(401);
        }

       //return next();
    }
};