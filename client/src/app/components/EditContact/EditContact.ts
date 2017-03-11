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

    @Input() editedContact: Member

    constructor(private memberActions: MembersActions) {




    }

    removeSubscription() {
        this.editedContact.wantUpdates = false;
    }

    revertChanges(){
        this.editedContact.isEdited = false;
        this.memberActions.getContacts();
    }

    addNewContact() {
        this.memberActions.saveContact(this.editedContact);
        this.editedContact.isEdited = false;
    }
}
