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


    var bucket = openBucket();

    contactToAdd.type = 'contact';
    console.log('contact to add', contactToAdd);

     bucket.upsert(getKey(contactToAdd), contactToAdd,
        function (err, result) {
            if (err) {
                console.error('Error saving contact', err);
            } else {
                console.log(result);
            }

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
        cluster.authenticate(config.database.credentials.userName, config.database.credentials.password);
        var bucket = cluster.openBucket('IWN');
        bucket.operationTimeout = 30 * 1000;

        return bucket;
    
    } catch(e) {
        // statements
        console.log('error opening bucket', e);
    }
    
}

function getContacts(callback) {

    let bucket = openBucket();

    var ViewQuery = couchbase.ViewQuery;

    var query = ViewQuery.from('dev_contacts', 'contacts');

    bucket.query(query, function (err, results) {
        var resultsToSend = null;
        console.log('got results', results);
        if (results) {
            resultsToSend = results.map(item => item.value);
        }
        if (resultsToSend) {
            resultsToSend.filter(item => item !== null) .forEach((item, index) => {
                item.key = results[index].key;
            });
        }

        callback(err, resultsToSend);
    });

}

function getUserByToken(userToken, callback) {

    var bucket = openBucket();
    bucket.get(userToken, function (err, result) {
        if (err) {
            console.error(err, userToken);
        }
        callback(err, result);

    });
}

function saveUser(user, callback) {

     let bucket = openBucket();
    bucket.operationTimeout = 30 * 1000;

    user.type = 'user';
    console.log('saving user', user);
    bucket.upsert('user_' + user.id, user,
        function (err, result) {
            if (err) {
                console.error('Error saving user',err);

            }
            else {
                console.log('user saved successfully')
            }
            callback(err, result);

        });
}

exports.newContact = newContact;
exports.getContacts = getContacts;
exports.getUserByToken = getUserByToken;
exports.saveUser = saveUser;
