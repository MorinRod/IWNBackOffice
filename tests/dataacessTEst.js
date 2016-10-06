/**
 * Created by ranwahle on 22/09/2016.
 */
var dataAccess = require('../dataAccess');
dataAccess.newContact({firstName:'רן',
lastName: 'ואלה',
eMail: 'ran.wahle@gmail.com',
address: 'מיכאל 18',
idNumber: '',
member: false,
wantUpdates: false,

city:'',
phoneNumber: '',
regularDonation: false,
sumOfDonation: 12000,
fromDate: new Date(2016, 11, 11),
toDate:new Date(2017, 11,11),
successfullTransaction:false,
number:12});
dataAccess.getContacts(function(err, result){
    console.log(result);
})