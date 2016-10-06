/**
 * Created by ranwahle on 20/09/2016.
 */
// var pulseemClient = require('../mailer/pulsimClient');
//
// pulseemClient.getUnsubscribedMails().then(response => console.log(response))
//     .catch(error => console.error(error));

var pulseemRestClient = require('../mailer/pulseemRestClient');

pulseemRestClient.sendMail( {
   UserId: 'שירלי פלג',
    Password: '1122000',
    FromEmail: 'ran.wahle@gmail.com',
    FromName: 'רן',
    ToEmail: 'michal.margaliot@mail.huji.ac.il',
    Subject: 'Test mail from Pulseem ',
    Html: 'This mail is send via Pulseem direct API',
 LanguageCode: 0


}, data => console.log(data));