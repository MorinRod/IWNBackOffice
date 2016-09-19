/**
 * Created by ranwahle on 07/09/2016.
 */
import {combineReducers} from 'redux';
import {contactsReducer} from "./contacts.reducer";
import {UsersReducer} from "./users.reducer";
import {serverReducer} from "./server.reducer";

export const RootReducer = combineReducers({
    contacts: contactsReducer,
    currentUser: UsersReducer,
    OnServerCall: serverReducer
});