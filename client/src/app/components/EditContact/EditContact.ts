/**
 * Created by ranwahle on 11/09/2016.
 */
import {Component, Input} from "@angular/core";

import {MembersActions} from "../../actions/members.actions";
import {Member} from "../../models/Member";
@Component({
    selector: 'edit-contact',
    templateUrl: './edit-contact.html'

})
export class EditContact {

     private menbersActions: MembersActions;
    @Input() editedContact: Member

    constructor(menbersActions: MembersActions) {

        this.menbersActions = menbersActions;


    }

    removeSubscription() {
        this.editedContact.wantUpdates = false;
    }

    revertChanges(){
        this.editedContact.isEdited = false;
        this.menbersActions.getContacts();
    }

    addNewContact() {
        this.menbersActions.saveContact(this.editedContact);
    }
}
