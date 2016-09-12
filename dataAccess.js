/**
 * Created by ranwahle on 11/09/2016.
 */

var couchbase = require('couchbase')

function newContact(contactToAdd) {
    if (!contactToAdd || !contactToAdd.idNumber) {
        throw 'Missing contact Id number';
    }


    var cluster = new couchbase.Cluster('couchbase://127.0.0.1/');
    var bucket = cluster.openBucket('IWNContacts');
    bucket.operationTimeout = 120 * 1000;


    contactToAdd.type = 'contact';

    console.log('contact to add', contactToAdd);
    bucket.upsert('contact_' + contactToAdd.email, contactToAdd,
        function (err, result) {
            if (err) {
                console.error(err);
            }

        });
}

function getContacts(callback) {
    var cluster = new couchbase.Cluster('couchbase://127.0.0.1/');
    var bucket = cluster.openBucket('IWNContacts');
    bucket.operationTimeout = 120 * 1000;

    var ViewQuery = couchbase.ViewQuery;

    var query = ViewQuery.from('contacts', 'contacts');

    bucket.query(query, function (err, results) {
        var resultsToSend = null;
        console.log('got results', results);
        if (results) {
            resultsToSend = results.map(item => item.value);
        }
        callback(err, resultsToSend);
    });

}

exports.newContact = newContact;
exports.getContacts = getContacts;
