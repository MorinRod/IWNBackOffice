import {Component} from "@angular/core";
import {Store} from "../app.store";
import {ContactsActions} from "../actions/contacts.actions";
/**
 * Created by ranwahle on 07/09/2016.
 */
@Component({
    selector: 'contacts-list-component',
    template: `<h2>אנשי קשר</h2>

<div class="row" *ngFor="let contact of _store.state.contacts ">
<div>{{contact.firstName}}</div>
<div>{{contact.lastName}}</div>
</div>

<button (click)="getContacts()">Get Contacts</button>
`

})
export class ContactsListCompoenent{

    private contacts:ContactsActions;
    private _store:Store
    constructor(_store:Store, contacts:ContactsActions){
        this._store = _store;
        this.contacts = contacts;

    }

    getContacts(){
        this.contacts.getContacts();
    }

}