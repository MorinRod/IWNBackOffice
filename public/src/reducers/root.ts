/**
 * Created by ranwahle on 07/09/2016.
 */
import {combineReducers} from 'redux';
import {contactsReducer} from "./contacts.reducer";

export const RootReducer = combineReducers({
    contacts: contactsReducer
});