"use strict";
var actions_1 = require("../constants/actions");
/**
 * Created by ranwahle on 19/09/2016.
 */
function serverReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.Server.OnServerCall: {
            return Object.assign({}, state, { loading: true });
        }
        case actions_1.Server.DismissServerCall: {
            return Object.assign({}, state, { loading: false });
        }
    }
    return state;
}
exports.serverReducer = serverReducer;
