/**
 * Created by ranwahle on 11/09/2016.
 */
"use strict";

let couchbase = require('couchbase');
let config = require('./config');
var address = config.database.url;// 'couchbase://10.211.55.11';

function newContact(contactToAdd) {
    
    if (!contactToAdd || (!contactToAdd.eMail && !contactToAdd.idNumber && !contactToAdd.phoneNumber)) {
        throw 'Missing contact Id number';
        }
    let bucket = openBucket();

    contactToAdd.type = 'contact';
        bucket.counter('contact_counter', 1,{initial:1}, (err, res) => {
            if (err) {
                        console.error('Error incrementing counter---', err);
                        }
            if(res) {
                console.log('result from counter function'+res);
                bucket.upsert('contact_'+res.value, contactToAdd, (error, result) => {
                        if (error) {
                            console.error('Error saving contact---', error);
                            }
                        console.log(result);
                    });
                }
            });   
}

function deleteContact(callback,idToDelete){
    let key = idToDelete;
    let bucket=openBucket();
    bucket.remove(key,function(err,result){
        if(err){
            console.error('----Error deleting ')
        }
        console.log(result);
    });
    //----Todo: delete related payments--------
}

function IdUniqueCheck(callback,id){
    let bucket=openBucket();
    var N1qlQuery=couchbase.N1qlQuery;
    var query= N1qlQuery.fromString('SELECT * from `IWN` where type="contact" and idNumber=$1');
    var memberId='\"'+id+'\"';
    console.log('id unique check id ',id);
    bucket.query(query,[id],function(err,res){
        if(err){
            console.error('-----Error in Id check');
        } 
        callback(err,res);
    });
}

function newPayment(paymentToAdd){
    if(!paymentToAdd || !paymentToAdd.transactionId)
        throw 'Missing payment\'s transaction Id number' ;
    var docId;
    if(paymentToAdd.docId){
        docId=paymentToAdd.docId;      
    }
    else{
        paymentToAdd.type='payment';
        docId='payment_'+paymentToAdd.transactionId;
    }
    //console.log("docId is ",docId);
    let bucket=openBucket();
    bucket.upsert(docId,paymentToAdd,function(err,result){
        if(err){
            console.error('Error saving payment---',err)
        }
        console.log(result);
    });
}

function getKey(contact) {
    let key = 'contact';
    if (contact.idNumber) {
        key += '_' + contact.idNumber;
    }
    else {
        if (contact.phoneNumber) {
            key += '_' + contact.phoneNumber;
        }
        if (contact.eMail) {
            key += '_' + contact.eMail;
        }
    }
    return key;
}

function openBucket() {
    try {
        console.log("-------- open bucket -------")
        var cluster = new couchbase.Cluster(address);
        console.log('username', config.database.credentials.username, 'password',config.database.credentials.password );
        cluster.authenticate(config.database.credentials.username, config.database.credentials.password)
        var bucket = cluster.openBucket('IWN');
        bucket.operationTimeout = 30 * 1000;

        return bucket;
    
    } catch(e) {
        // statements
        console.log(e);
    }
    
}

function getContacts(callback) {

    let bucket = openBucket();

    var ViewQuery = couchbase.ViewQuery;

    var query = ViewQuery.from('dev_contacts', 'contacts');

    bucket.query(query, function (err, results) {
        var resultsToSend = null;
        // console.log('got results', results);
        if (results) {
            resultsToSend = results.filter(item => typeof item.value === 'object').map(item => item.value);
        }
        if (resultsToSend) {
            resultsToSend.forEach((item, index) => {
                if(item && typeof item === 'object')
                    item.key = results[index].key;
            });
        }

        callback(err, resultsToSend);
    });

}

function getPayments(callback,id){
    let bucket = openBucket();
    var N1qlQuery = couchbase.N1qlQuery;
    var query = N1qlQuery.fromString('SELECT i.*,META(i).id as docId FROM `IWN` i WHERE type="payment" and memberId=$1');
    var memberId='\"'+id+'\"';

    bucket.query(query,[id],function(err,results){
        var resultsToSend = null;
        console.log('got results', results);
        // if (results) {
        //     resultsToSend = results.map(item => item.value);
        // }
        // console.log('results to send', resultsToSend);
        // if (results) {
        //     results.forEach((item, index) => {
        //         if(item)
        //             item.key = results[index].id;
        //     });
        // }
        //console.log('results to send', resultsToSend);

        callback(err, results);
    })
}


function getUserByToken(userToken, callback) {
    var cluster = new couchbase.Cluster(address);
    var bucket = openBucket();
    bucket.get(userToken, function (err, result) {
        if (err) {
            console.error(err, userToken);
        }
        callback(err, result);

    });
}

function saveUser(user, callback) {
   //  var cluster = new couchbase.Cluster(address);
     let bucket = openBucket();

    user.type = 'user';
    console.log('saving user', user);
    bucket.upsert('user_' + user.id, user,
        function (err, result) {
            if (err) {
                console.error(err);

            }
            else {
                console.log('user saved successfully')
            }
            callback(err, result);

        });
}

exports.newContact = newContact;
exports.newPayment = newPayment;
exports.getContacts = getContacts;
exports.getPayments = getPayments;
exports.getUserByToken = getUserByToken;
exports.saveUser = saveUser;
exports.deleteContact = deleteContact;
exports.IdUniqueCheck = IdUniqueCheck;
