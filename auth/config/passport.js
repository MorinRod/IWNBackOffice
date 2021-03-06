// load all the things we need
"use strict";
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function handleAuthCallback(req, token, refreshToken, profile, done, providerName){


        console.log('profile', profile);
        console.log('token', token);
        console.log('refreshtoken', refreshToken);

        process.nextTick(function () {

            // check if the user is already logged in
            if (!req.user) {



                var newUser = { };


                newUser.id = providerName + '_' + profile.id;

                newUser[providerName] = {
                    id: profile.id,
                    token: token,
                    name: profile.displayName,
                    email: (profile.emails[0].value || '').toLowerCase()
                };

                dataAccess.saveUser(newUser, function(err, result){
                    if (err){
                        console.log('error saving user', err);
                    }
                });

                return done(null, newUser);

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session
                if (!user[providerName]){
                    user[providerName] = {};
                }

                user[providerName].id = profile.id;
                user[providerName].token = token;
                user[providerName].name = profile.displayName;
                user[providerName].email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                dataAccess.saveUser(user,function(err, result){
                    if (err){
                        console.error('error saving user', err);
                    }
                });


                return done(null, user);

            }

        });

        console.log('google auth callback end');


}

// load up the user model
var User = require('../app/models/user');

var dataAccess = require('../../dataAccess');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        dataAccess.getUserByToken('user_' + id, done);
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne({'local.email': email}, function (err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {

                            // create the user
                            var newUser = new User();

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }

                    });
                    // if the user is logged in but has no local account...
                } else if (!req.user.local.email) {
                    // ...presumably they're trying to connect a local account
                    // BUT let's check if the email used to connect a local account is being used by another user
                    User.findOne({'local.email': email}, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                        } else {
                            var user = req.user;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                    });
                } else {
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'name', 'email'],
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function (req, token, refreshToken, profile, done) {

            if (typeof profile.name === 'object'){
               profile.name =  profile.name.givenName + ' ' + profile.name.familyName;
            }
            handleAuthCallback(req, token, refreshToken, profile, done, 'facebook');
            // asynchronous


        }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    // passport.use(new TwitterStrategy({
    //
    //    // consumerKey     : configAuth.twitterAuth.consumerKey,
    //     consumerSecret  : configAuth.twitterAuth.consumerSecret,
    //     callbackURL     : configAuth.twitterAuth.callbackURL,
    //     passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    //
    // },
    // function(req, token, tokenSecret, profile, done) {
    //
    //     // asynchronous
    //     process.nextTick(function() {
    //
    //         // check if the user is already logged in
    //         if (!req.user) {
    //
    //             User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    //                 if (err)
    //                     return done(err);
    //
    //                 if (user) {
    //                     // if there is a user id already but no token (user was linked at one point and then removed)
    //                     if (!user.twitter.token) {
    //                         user.twitter.token       = token;
    //                         user.twitter.username    = profile.username;
    //                         user.twitter.displayName = profile.displayName;
    //
    //                         user.save(function(err) {
    //                             if (err)
    //                                 return done(err);
    //
    //                             return done(null, user);
    //                         });
    //                     }
    //
    //                     return done(null, user); // user found, return that user
    //                 } else {
    //                     // if there is no user, create them
    //                     var newUser                 = new User();
    //
    //                     newUser.twitter.id          = profile.id;
    //                     newUser.twitter.token       = token;
    //                     newUser.twitter.username    = profile.username;
    //                     newUser.twitter.displayName = profile.displayName;
    //
    //                     newUser.save(function(err) {
    //                         if (err)
    //                             return done(err);
    //
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //
    //         } else {
    //             // user already exists and is logged in, we have to link accounts
    //             var user                 = req.user; // pull the user out of the session
    //
    //             user.twitter.id          = profile.id;
    //             user.twitter.token       = token;
    //             user.twitter.username    = profile.username;
    //             user.twitter.displayName = profile.displayName;
    //
    //             user.save(function(err) {
    //                 if (err)
    //                     return done(err);
    //
    //                 return done(null, user);
    //             });
    //         }
    //
    //     });
    //
    // }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({

            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function (req, token, refreshToken, profile, done) {

            handleAuthCallback(req, token, refreshToken, profile, done, 'google');


        }));

};
