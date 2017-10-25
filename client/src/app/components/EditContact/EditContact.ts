/**
 * Created by ranwahle on 11/09/2016.
 */
import {Component, Input} from "@angular/core";
import { Store } from "../../app.store";
import {MembersActions} from "../../actions/members.actions";
import {Member} from "../../models/Member";
@Component({
    selector: 'edit-contact',
    templateUrl: './edit-contact.html'

})
export class EditContact {

     private membersActions: MembersActions;
     private _store: Store;
    @Input() editedContact: Member

    constructor(private memberActions: MembersActions,_store:Store) {
      this.membersActions=memberActions;
      this._store=_store;
    }

    removeSubscription() {
        this.editedContact.wantUpdates = false;
    }

    revertChanges(){
        this.editedContact.isEdited = false;

        this.memberActions.getContacts();
    }

    addContact(){
        if(this.editedContact.isNew){
            this.addNewContact();
        }
        else
            this.editContact();
    }

    private editContact(){
        this.memberActions.saveContact(this.editedContact);
        this.editedContact.isEdited = false;
    }

    addNewContact() {
        this.editedContact.errMsg='';
        //console.log("result of ifExist() is ",this.IdExists(this.editedContact.idNumber))
        if(!this.IdExists(this.editedContact.idNumber)){
            this.memberActions.saveContact(this.editedContact);
            this.editedContact.isEdited = false;
        }
        else{
            this.editedContact.errMsg='ת.ז כבר קיימת במערכת';
        }
        
    }

    private IdExists(id:string){
    let members = this._store.state.members;
    console.log(this._store.state.members);
    if(members){
      let member = members.find(member => member.idNumber === id);
      if(member){
          console.log("member exists ",JSON.stringify(member));
        return true;
      }
      else{
          return false;
      }
    }
    else{
        return false;   
          }
      }

 }
