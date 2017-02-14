import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "../app.store";
import { MembersActions } from "../actions/members.actions";
import { Member } from "../models/Member";
import { SearchPipePipe } from "../pipes/search-pipe.pipe";
/**
 * Created by ranwahle on 07/09/2016.
 */
@Component({
  selector: 'contacts-list-component',

  template: `<h2>רשימת חברים
<span *ngIf="filteredMembers">( {{filteredMembers.length}} / {{_store.state.members ? _store.state.members.length : 0}}  )
</span>

</h2>

<a class="glyphicon glyphicon-plus" href="javascript:void(0)"
(click)="addNewContact()" title="חדש" ></a>
<label for="searchBox">חיפוש חפשי:</label>
<input type="text" id="searchBox" placeholder="חיפוש חפשי" [(ngModel)]="searchWord" name="searchWord" (keypress)="searchKeyPressed()">

<button (click)="getContacts()" class="glyphicon glyphicon-refresh">טעינה</button>
<div *ngIf="_store.state.members && _store.state.members.length">
<div class="row" >
<!--<div class="col-xs-1 header-row">מספר סידורי</div>-->
<div class="col-xs-1 header-row"><a  [appSortArrow]="'firstName'" [currentKeyWord]="sortKey" (click)="sortBy('firstName')" href="javascript:void(0)"> שם פרטי</a></div>
<div class="col-xs-1 header-row">
<a  [appSortArrow]="'lastName'" [currentKeyWord]="sortKey" (click)="sortBy('lastName')" href="javascript:void(0)">
שם משפחה
</a>
</div>
<div class="col-xs-1 header-row">
<a  [appSortArrow]="'idNumber'" [currentKeyWord]="sortKey" (click)="sortBy('idNumber')" href="javascript:void(0)">
תעודת זהות
</a>
</div>
<div class="col-xs-1 header-row hidden-xs">
<a  [appSortArrow]="'phoneNumber'" [currentKeyWord]="sortKey" (click)="sortBy('phoneNumber')" href="javascript:void(0)">
טלפון
</a>
</div>
<div class="col-xs-1 header-row hidden-xs">
<a  [appSortArrow]="'city'" [currentKeyWord]="sortKey" (click)="sortBy('city')" href="javascript:void(0)">
יישוב
</a>
</div>
<div class="col-xs-1 header-row hidden-xs">
<a  [appSortArrow]="'address'" [currentKeyWord]="sortKey" (click)="sortBy('address')" href="javascript:void(0)">
כתובת
</a>
</div>

<div class="col-xs-2 header-row">
<a  [appSortArrow]="'emailAddress'" [currentKeyWord]="sortKey" (click)="sortBy('emailAddress')" href="javascript:void(0)">
e-mail
</a>
</div>
<div class="col-xs-1 header-row hidden-xs">תאריך הצטרפות</div>
<div class="col-xs-1 header-row hidden-xs" >תאריך אחרון לתשלום</div>
<a class="glyphicon glyphicon-fast-forward" href="javascript:void(0)" (click)="moveFastBackwards()" *ngIf="from > 0"></a>

<a class="glyphicon glyphicon-step-forward" href="javascript:void(0)" (click)="moveBackwards()" *ngIf="from > 0"></a>
<a class="glyphicon glyphicon-step-backward" href="javascript:void(0)" (click)="moveForward()"
 *ngIf="filteredMembers &&  from + itemsInPage < filteredMembers.length"></a>
 <a class="glyphicon glyphicon-fast-backward" href="javascript:void(0)" (click)="moveFastForward()"
 *ngIf="filteredMembers && from + itemsInPage < filteredMembers.length"></a>
{{from + 1}} - {{ to }}
<!--<div class="col-xs-1 header-row">מעוניינת בעדכונים</div>-->
<!--<div class="col-xs-1 header-row">מעוניינת להצטרף</div>-->
</div>
<div class="spacerDiv"></div>
<edit-contact *ngIf="newContact && newContact.isEdited" [editedContact]="newContact"></edit-contact>
<div class="row" *ngFor="let member of filteredMembers | orderBy: [sortKey] | pagingPipe:from:from+itemsInPage; let index = index ">

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
  private sortKey: string;

  ngOnInit(): void {
    this.getContacts();
  }

  private memberActions: MembersActions;
  private _store: Store;
  private newContact: Member;
  private searchWord: string;

  private from: number;
  private itemsInPage: number;

  constructor(_store: Store, memberActions: MembersActions, private cd: ChangeDetectorRef) {
    this._store = _store;
    this.memberActions = memberActions;
    this.from = 0;
    this.itemsInPage = 20;


  }

  private get filteredMembers(): Member[] {
    let result = new SearchPipePipe().transform(this._store.state.members,
      this.searchWord);

    return result;
  }

  private get to(): number {
    if (! this.filteredMembers){
      return 0;
    }
    return Math.min(this.from + this.itemsInPage, this.filteredMembers.length);
  }

  sortBy(key: string) {
    if (this.sortKey === key) {
      this.sortKey = '-' + key;
    }    else {
      this.sortKey = key;
    }

  }

  searchKeyPressed() {
    this.from = 0;
  }

  moveFastForward() {

    const length = this.filteredMembers.length;
    this.from = length - (length % this.itemsInPage);
  }

  moveForward() {
    this.from += this.itemsInPage;
  }

  moveFastBackwards() {
    this.from = 0;
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
