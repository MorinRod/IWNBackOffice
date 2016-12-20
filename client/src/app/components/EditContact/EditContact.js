"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by ranwahle on 11/09/2016.
 */
var core_1 = require("@angular/core");
var Member_1 = require("../../models/Member");
var EditContact = (function () {
    function EditContact(menbersActions) {
        this.menbersActions = menbersActions;
        this.editedContact = new Member_1.Member();
    }
    EditContact.prototype.removeSubscription = function () {
        this.editedContact.wantUpdates = false;
    };
    EditContact.prototype.revertChanges = function () {
        this.menbersActions.getContacts();
    };
    EditContact.prototype.addNewContact = function () {
        this.menbersActions.saveContact(this.editedContact);
    };
    __decorate([
        core_1.Input()
    ], EditContact.prototype, "editedContact", void 0);
    EditContact = __decorate([
        core_1.Component({
            selector: 'edit-contact',
            templateUrl: './edit-contact.html'
        })
    ], EditContact);
    return EditContact;
}());
exports.EditContact = EditContact;
