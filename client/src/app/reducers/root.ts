/**
 * Created by ranwahle on 07/09/2016.
 */
import {combineReducers, Reducer} from 'redux';
import {UsersReducer} from "./users.reducer";
import {serverReducer} from "./server.reducer";
import {membersReducer} from "./members.reducer";
import {paymentsReducer} from "./payments.reducer";
import {errorMsgReducer} from "./errorMsg.reducer";

export const RootReducer : Reducer<any>  = combineReducers({
    members: membersReducer,
    currentUser: UsersReducer,
    OnServerCall: serverReducer,
    payments: paymentsReducer,
    errorMsg: errorMsgReducer
});
