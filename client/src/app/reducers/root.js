"use strict";
/**
 * Created by ranwahle on 07/09/2016.
 */
var redux_1 = require('redux');
var users_reducer_1 = require("./users.reducer");
var server_reducer_1 = require("./server.reducer");
var members_reducer_1 = require("./members.reducer");
var payments_reducer_1 = require("./payments.reducer");
exports.RootReducer = redux_1.combineReducers({
    members: members_reducer_1.membersReducer,
    currentUser: users_reducer_1.UsersReducer,
    OnServerCall: server_reducer_1.serverReducer,
    payments: payments_reducer_1.paymentsReducer
});
