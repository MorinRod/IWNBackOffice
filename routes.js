
/**
 * Created by ranwahle on 13/09/2016.
 */
module.exports = function(app, passport, express) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });



//This section will hold our Routes

    // routes.RoutesPaths.paths.forEach(route => {
    //     app.use('/' + route.path, express.static('public'));
    // });

    app.use('/', express.static('public'));
    app.use('/members-screen', isLoggedIn, express.static('public'));
    app.use('/register', express.static('public'));
    app.use('/node_modules', express.static('node_modules'));
// app.get('/', function(req, res) {
//     res.send('hello world');
// });

    app.get('/currentUser', isLoggedIn, function (req, response) {
        if (req.user.value.google){
            response.send(req.user.value.google);
        }
        else if (req.user.value.facebook){
            response.send(req.user.value.facebook);
        }

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

    app.get('/contacts',isLoggedIn, function (req, res) {
        var dataAccess = require('./dataAccess');
        dataAccess.getContacts(function (err, results) {
            console.log('error', err);
            console.log('results', results);
            res.send(results);
        });
        // res.send( [{firstName: 'Ran', lastName: 'Wahle'
        // , eMail: 'ran.wahle@gmail.com'}]);
    });
    app.post('/contacts', function (req, res) {
        try {
            var dataAccess = require('./dataAccess');

            dataAccess.newContact(req.body);
        }
        catch (err) {
            console.error(err);
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
        successRedirect: '/?code=',
        failureRedirect: '/?code=error'
    }));




// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            console.log('user', req.user);
            return next();
        }

       return next({});
    }
};