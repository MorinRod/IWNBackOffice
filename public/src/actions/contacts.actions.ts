/**
 * Created by ranwahle on 07/09/2016.
 */

import {Injectable} from "@angular/core";
import {Store} from "../app.store";
import {Contacts} from "../constants/actions";

@Injectable()
export class ContactsActions{
    private store:Store;

    constructor(store:Store){
        this.store = store;
    }

    getContacts(){
        this.store.dispatch({
         type: Contacts.GetContacts
        });
    }
}