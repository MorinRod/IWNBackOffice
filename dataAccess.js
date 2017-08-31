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
    //console.log('contact to add', contactToAdd);
    bucket.counter('contact_counter', 1,{'initial':0}, result=>{
         bucket.upsert('contact_'+result, contactToAdd,
            function (err, result) {
                if (err) {
                    console.error('Error saving contact---', err);
                }
                console.log(result);

            });
        });
    
}

function deleteContact(callback,idToDelete){
    let key = 'contact_' + idToDelete;
    let bucket=openBucket();
    bucket.remove(key,function(err,result){
        if(err){
            console.error('----Error deleting ')
        }
        console.log(result);
    });
    //----Todo: delete related payments--------
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
        var bucket = cluster.openBucket('iwn', config.database.password);
        //var bucket = cluster.openBucket('IWN','');
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
        //console.log('got results', results);
        if (results) {
            resultsToSend = results.map(item => item.value);
        }
        if (resultsToSend) {
            resultsToSend.forEach((item, index) => {
                if(item)
                    item.key = results[index].key;
            });
        }

        callback(err, resultsToSend);
    });

}

function getPayments(callback,id){
    let bucket = openBucket();
    var N1qlQuery = couchbase.N1qlQuery;
    var query = N1qlQuery.fromString('SELECT i.*,META(i).id as docId FROM `iwn` i WHERE type="payment" and memberId=$1');
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
    var cluster = new couchbase.Cluster(address);
     let bucket = openBucket();
    bucket.operationTimeout = 30 * 1000;

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
