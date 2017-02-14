"use strict";
var actions_1 = require("../constants/actions");
/**
 * Created by ranwahle on 19/12/2016.
 */
function paymentsReducer(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case actions_1.Members.PaymentsLoaded: {
            return Object.assign({}, state, { payments: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.paymentsReducer = paymentsReducer;
