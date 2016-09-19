// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1165975703480404', // your App ID
        'clientSecret'    : '39411d45bc054350a599b09581fef1b0', // your App Secret
        'callbackURL'     : 'http://localhost:5000/auth/facebook/callback'
    },



    'googleAuth' : {
        'clientID'         : '1022997254975-kfqirt46tp3719gs3ssd8s0kd2s0mksh.apps.googleusercontent.com',
        'clientSecret'     : 'MF1WnInNYDIJeGYsZuMpcaXx',
        'callbackURL'      : 'http://localhost:5000/auth/google/callback'
    }

};
