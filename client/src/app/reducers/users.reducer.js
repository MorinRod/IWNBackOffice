"use strict";
var actions_1 = require("../constants/actions");
/**
 * Created by ranwahle on 15/09/2016.
 */
function UsersReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.Users.SetCurrentUser: {
            return action.payload.slice();
        }
        case actions_1.Users.CurrentUserLoaded: {
            return [action.payload];
        }
        case actions_1.Users.LoadingError: {
            return null;
        }
        case actions_1.Users.LogOut: {
            return null;
        }
    }
    return state;
}
exports.UsersReducer = UsersReducer;
