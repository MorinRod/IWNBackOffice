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
<div class="col-xs-1" ><input type="text" placeholder="שם פרטי" [(ngModel)]="editedContact.firstName" name="firstName"/>
</div>
<div class="col-xs-1" ><input type="text" placeholder="שם משפחה" [(ngModel)]="editedContact.lastName" name="lastName"/>
</div>

<div class="col-xs-1" ><input type="email" placeholder="e-mail"  [(ngModel)]="editedContact.eMail" name="email"/>
</div>
<div class="col-xs-1 hidden-xs"> <input type="date" name="fromDate" [(ngModel)]="editedContact.fromDate"></div>
<div class="col-xs-1 hidden-xs"> <input type="date" name="toDate" [(ngModel)]="editedContact.toDate"></div>
<div class="col-xs-1 hidden-xs"> <input type="text" name="city" [(ngModel)]="editedContact.city"></div>
<div class="col-xs-1 hidden-xs"> <input type="text" name="address" [(ngModel)]="editedContact.address"></div>
<div class="col-xs-1 hidden-xs"> <input type="text" name="phoneNumber" [(ngModel)]="editedContact.phoneNumber"></div>
<div class="col-xs-1 hidden-xs"> <input type="checkbox" name="wantUpdates" [(ngModel)]="editedContact.wantUpdates"></div>
<div class="col-xs-1 hidden-xs"> <input type="checkbox" name="member" [(ngModel)]="editedContact.member"></div>



 
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