/**
 * Created by ranwahle on 11/09/2016.
 */
import {Component, Input} from "@angular/core";
import {Store} from "../app.store";
import {MembersActions} from "../actions/members.actions";
import {Member} from "../models/Member";
@Component({
    selector: 'edit-contact',
    template: `<form (submit)="addNewContact()" *ngIf="editedContact" style="margin:20px;">
<div>
<input [labelText]="'שם פרטי:'" [id]="editedContact.key + '_firstName'"  type="text" placeholder="שם פרטי" [(ngModel)]="editedContact.firstName" name="firstName"/>
</div>

<div><label [attr.for]="editedContact.key + '_lastName'">שם משפחה:</label>
 <input [id]="editedContact.key + '_lastName'" type="text" placeholder="שם משפחה" [(ngModel)]="editedContact.lastName" name="lastName"/></div>
<div>

<input [labelText]="'מספר תעודת זהות:'" [id]="editedContact.key + '_idNumber'"  type="text" placeholder="תעודת זהות" [(ngModel)]="editedContact.idNumber" name="idNumber"/></div>
<div>
 <input type="text" name="phoneNumber" [id]="editedContact.key + '_phoneNumber'" [labelText]="'מספר טלפון:'"
  [(ngModel)]="editedContact.phoneNumber"></div>
<div><input [id]="editedContact.key + '_city'" [labelText]="'יישוב:'" type="text" name="city" [(ngModel)]="editedContact.city"></div>
<div><input [id]="editedContact.key + '_address'" [labelText]="'כתובת:'" type="text" name="address" [(ngModel)]="editedContact.address"></div>
<div><input [id]="editedContact.key + '_eMail'" [labelText]="'כתובת דוא&quot;ל:'"  type="email" placeholder="e-mail"  [(ngModel)]="editedContact.eMail" name="email"/></div>
<div><input [id]="editedContact.key + '_fromDate'" [labelText]="'מתאריך:'" type="date" name="fromDate" [(ngModel)]="editedContact.fromDate"></div>
<div><input  [id]="editedContact.key + '_toDate'" [labelText]="'תאריך אחרון לתשלום:'" type="date" name="toDate" [(ngModel)]="editedContact.toDate"></div>
<!--<div class="col-xs-1" >-->
<!--</div>-->
<!--<div class="col-xs-1" ><input type="text" placeholder="שם משפחה" [(ngModel)]="editedContact.lastName" name="lastName"/>-->
<!--</div>-->

<!--<div class="col-xs-1" ><input type="email" placeholder="e-mail"  [(ngModel)]="editedContact.eMail" name="email"/>-->
<!--</div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="date" name="fromDate" [(ngModel)]="editedContact.fromDate"></div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="date" name="toDate" [(ngModel)]="editedContact.toDate"></div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="text" name="city" [(ngModel)]="editedContact.city"></div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="text" name="address" [(ngModel)]="editedContact.address"></div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="text" name="phoneNumber" [(ngModel)]="editedContact.phoneNumber"></div>-->
<!--<div class="col-xs-1 hidden-xs"> <a href="javascript:nvoid(0)" (click)="removeSubscription()">הסרה מרשימות תפוצה</a> </div>-->
<!--<div class="col-xs-1 hidden-xs"> <input type="checkbox" name="member" [(ngModel)]="editedContact.member"></div>-->


<button type="button" class="glyphicon glyphicon-remove" (click)="revertChanges()"></button>

 
<button type="submit" class="glyphicon glyphicon-floppy-disk"></button>
</form>`

})
export class EditContact {

    private _store: Store;
    private menbersActions: MembersActions;
    @Input() editedContact: Member

    constructor(_store: Store, menbersActions: MembersActions) {
        this._store = _store;
        this.menbersActions = menbersActions;
        this.editedContact = new Member();

    }

    removeSubscription() {
        this.editedContact.wantUpdates = false;
    }

    revertChanges(){
        this.menbersActions.getContacts();
    }

    addNewContact() {
        this.menbersActions.saveContact(this.editedContact);
    }
}