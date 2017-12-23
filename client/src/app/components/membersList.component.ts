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
  templateUrl: './membersList.component.html'
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

  deleteMember(member) {
    // console.log("member to delete is",JSON.stringify(member));
    this.memberActions.deleteMember(member);
  }

  addNewContact() {
    let member = new Member();
    member.isEdited = true;
    member.isNew=true;

    //this.memberActions.addContact(member);
    this.newContact = member;
  }

  getContacts() {
    this.memberActions.getContacts();
  }

  editContact(member) {
    member.isEdited = true;
    member.isNew=false;
    this.newContact = member;
  }
 

}
