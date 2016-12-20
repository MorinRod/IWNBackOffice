"use strict";
var users_actions_1 = require("./users.actions");
var server_actions_1 = require("./server.actions");
var members_actions_1 = require("./members.actions");
/**
 * Created by ranwahle on 08/09/2016.
 */
exports.APP_ACTIONS = [members_actions_1.MembersActions, users_actions_1.UsersActions, server_actions_1.ServerActions];
