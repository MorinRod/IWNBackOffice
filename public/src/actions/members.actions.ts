/**
 * Created by ranwahle on 07/09/2016.
 */

import {Injectable} from "@angular/core";
import {Store} from "../app.store";
import {Members} from "../constants/actions";

@Injectable()
export class MembersActions{
    private store:Store;

    constructor(store:Store){
        this.store = store;
    }

    getContacts(){
        this.store.dispatch({
         type: Members.GetMembers
        });
    }

    saveContact(contact){
        this.store.dispatch({
            type: Members.SaveMember,
            payload: contact
        });
    }

    addContact(contact) {
        this.store.dispatch({
            type: Members.AddMember,
            payload: contact
        });
    }
}