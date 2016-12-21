import {Component, OnInit} from "@angular/core";
import {Store} from "../app.store";
import {MembersActions} from "../actions/members.actions";
import {Member} from "../models/Member";
/**
 * Created by ranwahle on 07/09/2016.
 */
@Component({
    selector: 'contacts-list-component',

    template: `<h2>רשימת חברים 
({{_store.state.members ? _store.state.members.length : 0}})</h2>
<a class="glyphicon glyphicon-plus" href="javascript:void(0)" 
(click)="addNewContact()" title="חדש" ></a>

<button (click)="getContacts()" class="glyphicon glyphicon-refresh">טעינה</button>
<div *ngIf="_store.state.members && _store.state.members.length">
<div class="row" >
<div class="col-xs-1 header-row">שם פרטי</div>
<div class="col-xs-1 header-row">שם משפחה</div>
<div class="col-xs-1 header-row">תעודת זהות</div>
<div class="col-xs-1 header-row hidden-xs">טלפון</div>
<div class="col-xs-1 header-row hidden-xs">יישוב</div>
<div class="col-xs-1 header-row hidden-xs">כתובת</div>

<div class="col-xs-2 header-row">e-mail</div>
<div class="col-xs-1 header-row hidden-xs">תאריך הצטרפות</div>
<div class="col-xs-1 header-row hidden-xs" >תאריך אחרון לתשלום</div>


<!--<div class="col-xs-1 header-row">מעוניינת בעדכונים</div>-->
<!--<div class="col-xs-1 header-row">מעוניינת להצטרף</div>-->
</div>
<div class="spacerDiv"></div>
<div class="row" *ngFor="let member of _store.state.members ">

<contact-component *ngIf="member && !member.isEdited" [contact]="member"></contact-component>
<div class="col-xs-1" *ngIf="!member.isEdited" >
<a class="glyphicon glyphicon-pencil" href="javascript:void(0)" title="עריכה"
 (click)="editContact(member)"></a>
 <a class="glyphicon glyphicon-erase" title="מחיקה" (click)="deleteMember(member)"></a>
 </div>
 
<edit-contact *ngIf="member.isEdited" [editedContact]="member"></edit-contact>
</div>

<edit-contact *ngIf="newContact" [editedContact]="_store.state.newContact"></edit-contact>
</div>
`

})
export class MembersListComponent implements OnInit{
    ngOnInit(): void {
        this.getContacts();
    }

    private memberActions: MembersActions;
    private _store: Store;
    private  newContact:Member;

    constructor(_store: Store, memberActions: MembersActions) {
        this._store = _store;
        this.memberActions = memberActions;


    }

  deleteMember(member: Member){
      this.memberActions.deleteMember(member);
  }

    addNewContact(){
        let member = new Member();
        member.isEdited = true;
        this.memberActions.addContact(member);
    }

    getContacts() {
        this.memberActions.getContacts();
    }

    editContact(member){
        member.isEdited = true;
    }

}
