/**
 * Created by ranwahle on 10/10/2016.
 */
"use strict";
let config = {
    port: 5000,
    security: {
        defaultAdminId: 'google_102180803478740486911'
    },
    database: {
        url: 'couchbase://localhost:8091', //couchbase://10.211.55.11' couchbase://13.79.36.80
        credentials: {
            userName: 'Morin',
            password: 'Rome123'
        }
    }
};

module.exports = config;
