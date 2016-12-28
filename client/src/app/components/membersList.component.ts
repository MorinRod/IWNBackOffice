import {Component, OnInit} from "@angular/core";
import {Store} from "../app.store";
import {MembersActions} from "../actions/members.actions";
import {Member} from "../models/Member";
import {SearchPipePipe} from "../pipes/search-pipe.pipe";
/**
 * Created by ranwahle on 07/09/2016.
 */
@Component({
  selector: 'contacts-list-component',

  template: `<h2>רשימת חברים 
( {{filteredMembers.length}} / {{_store.state.members ? _store.state.members.length : 0}}  )</h2>
<a class="glyphicon glyphicon-plus" href="javascript:void(0)" 
(click)="addNewContact()" title="חדש" ></a>
<label for="searchBox">חיפוש חפשי:</label>
<input type="text" id="searchBox" placeholder="חיפוש חפשי" [(ngModel)]="searchWord" name="searchWord" (keypress)="searchKeyPressed()">

<button (click)="getContacts()" class="glyphicon glyphicon-refresh">טעינה</button>
<div *ngIf="_store.state.members && _store.state.members.length">
<div class="row" >
<!--<div class="col-xs-1 header-row">מספר סידורי</div>-->
<div class="col-xs-1 header-row">שם פרטי</div>
<div class="col-xs-1 header-row">שם משפחה</div>
<div class="col-xs-1 header-row">תעודת זהות</div>
<div class="col-xs-1 header-row hidden-xs">טלפון</div>
<div class="col-xs-1 header-row hidden-xs">יישוב</div>
<div class="col-xs-1 header-row hidden-xs">כתובת</div>

<div class="col-xs-2 header-row">e-mail</div>
<div class="col-xs-1 header-row hidden-xs">תאריך הצטרפות</div>
<div class="col-xs-1 header-row hidden-xs" >תאריך אחרון לתשלום</div>
<a class="glyphicon glyphicon-step-forward" href="javascript:void(0)" (click)="moveBackwards()" *ngIf="from > 0"></a>
<a class="glyphicon glyphicon-step-backward" href="javascript:void(0)" (click)="moveForward()"
 *ngIf="from + itemsInPage < filteredMembers.length"></a>

<!--<div class="col-xs-1 header-row">מעוניינת בעדכונים</div>-->
<!--<div class="col-xs-1 header-row">מעוניינת להצטרף</div>-->
</div>
<div class="spacerDiv"></div>
<edit-contact *ngIf="newContact && newContact.isEdited" [editedContact]="newContact"></edit-contact>
<div class="row" *ngFor="let member of filteredMembers | pagingPipe:from:from+itemsInPage; let index = index ">

<contact-component *ngIf="member && !member.isEdited" [index]="from + index" [hilightWord]="searchWord" [contact]="member"></contact-component>
<div class="col-xs-1" *ngIf="!member.isEdited" >
<a class="glyphicon glyphicon-pencil" href="javascript:void(0)" title="עריכה"
 (click)="editContact(member)"></a>
 <a class="glyphicon glyphicon-erase" title="מחיקה" (click)="deleteMember(member)"></a>
 </div>
 
<edit-contact *ngIf="member.isEdited && member !== newContact" [editedContact]="member"></edit-contact>
</div>


</div>
`

})
export class MembersListComponent implements OnInit {
  ngOnInit(): void {
    this.getContacts();
  }

  private memberActions: MembersActions;
  private _store: Store;
  private newContact: Member;
  private searchWord: string;

  private from: number;
  private itemsInPage: number;

  constructor(_store: Store, memberActions: MembersActions) {
    this._store = _store;
    this.memberActions = memberActions;
    this.from = 0;
    this.itemsInPage = 20;


  }

  private get filteredMembers(): Member[]{
      return new SearchPipePipe().transform( this._store.state.members,
        this.searchWord);
  }

  searchKeyPressed() {
    this.from = 0;
  }

  moveForward() {
    this.from += this.itemsInPage;
  }

  moveBackwards() {
    this.from -= this.itemsInPage;
  }

  deleteMember(member: Member) {
    this.memberActions.deleteMember(member);
  }

  addNewContact() {
    let member = new Member();
    member.isEdited = true;
    this.memberActions.addContact(member);

    this.newContact = member;

  }

  getContacts() {
    this.memberActions.getContacts();
  }

  editContact(member) {
    member.isEdited = true;
  }

}
