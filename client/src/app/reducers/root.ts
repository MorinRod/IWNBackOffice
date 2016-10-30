/**
 * Created by ranwahle on 07/09/2016.
 */
import {combineReducers} from 'redux';
import {UsersReducer} from "./users.reducer";
import {serverReducer} from "./server.reducer";
import {membersReducer} from "./members.reducer";

export const RootReducer = combineReducers({
    members: membersReducer,
    currentUser: UsersReducer,
    OnServerCall: serverReducer
});