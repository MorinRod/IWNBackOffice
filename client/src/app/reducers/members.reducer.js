"use strict";
var actions_1 = require("../constants/actions");
/**
 * Created by ranwahle on 07/09/2016.
 */
function membersReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.Members.Filter: {
            return [];
        }
        case actions_1.Members.GetMembers: {
            return state.slice();
        }
        case actions_1.Members.Loaded: {
            return action.payload.slice();
        }
        case actions_1.Members.AddMember: {
            console.log('state', state);
            return state.concat([action.payload]);
        }
        case actions_1.Members.Deleted: {
            return Object.assign([], state.filter(function (member) { return member.memberId !== action.payload.memberId; }));
        }
    }
    return [];
}
exports.membersReducer = membersReducer;
