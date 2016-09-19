import {Contacts} from "../constants/actions";
/**
 * Created by ranwahle on 07/09/2016.
 */
export function contactsReducer(state = [], action){
    switch (action.type){
        case Contacts.Filter:{
            return [];

        }
        case Contacts.GetContacts:{
            return state;
        }

        case Contacts.Loaded:{
            return [...action.payload];
        }
    }
    return [];
}