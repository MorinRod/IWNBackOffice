/**
 * Created by ranwahle on 11/09/2016.
 */
import {Component, Input} from "@angular/core";
import {Store} from "../app.store";
import {ContactsActions} from "../actions/contacts.actions";
import {Contact} from "../models/Contact";
@Component({
    selector: 'edit-contact',
    template: `<form (submit)="addNewContact()" *ngIf="editedContact">
<input type="text" placeholder="שם פרטי" [(ngModel)]="editedContact.firstName" name="firstName"/>
<input type="text" placeholder="שם משפחה" [(ngModel)]="editedContact.lastName" name="lastName"/>
<input type="text" placeholder="מספר זהות" [(ngModel)]="editedContact.idNumber" name="idNumber"/>
 <input type="email" placeholder="e-mail"  [(ngModel)]="editedContact.email" name="email"/>
<button type="submit" class="glyphicon glyphicon-floppy-disk"></button>
</form>`

})
export class EditContact{

    private _store:Store;
    private contacts:ContactsActions;
    @Input() editedContact:Contact

    constructor(_store:Store, contacts:ContactsActions){
        this._store = _store;
        this.contacts = contacts;
        this.editedContact =  new Contact();

    }

    addNewContact(){
        this.contacts.addContact(this.editedContact);
    }
}