import {Component} from "@angular/core";
import {Store} from "../app.store";
import {ContactsActions} from "../actions/contacts.actions";
import {ContactComponent} from "./ContactComponent";
import {EditContact} from "./EditContact";
/**
 * Created by ranwahle on 07/09/2016.
 */
@Component({
    selector: 'contacts-list-component',
    directives: [ContactComponent, EditContact],
    template: `<h2>אנשי קשר</h2>
<button (click)="getContacts()" class="glyphicon glyphicon-refresh">טעינת אנשי קשר</button>
<div *ngIf="_store.state.contacts.length">
<div class="row" >
<div class="col-xs-1 header-row">שם פרטי</div>
<div class="col-xs-1 header-row">שם משפחה</div>
<div class="col-xs-1 header-row">e-mail</div>
</div>
<div class="row" *ngFor="let contact of _store.state.contacts ">

<contact-component *ngIf="contact && !contact.isEdited" [contact]="contact"></contact-component>
<div class="col-xs-1" *ngIf="!contact.isEdited" >
<a class="glyphicon glyphicon-pencil" href="javascript:void(0)" (click)="editContact(contact)"></a>
 </div>
<edit-contact *ngIf="contact.isEdited" [editedContact]="contact"></edit-contact>
</div>
</div>

`

})
export class ContactsListCompoenent {

    private contacts: ContactsActions;
    private _store: Store

    constructor(_store: Store, contacts: ContactsActions) {
        this._store = _store;
        this.contacts = contacts;

    }

    getContacts() {
        this.contacts.getContacts();
    }

    editContact(contact){
        contact.isEdited = true;
    }

}