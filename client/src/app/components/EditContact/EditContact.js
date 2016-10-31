"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by ranwahle on 11/09/2016.
 */
var core_1 = require("@angular/core");
var app_store_1 = require("../app.store");
var members_actions_1 = require("../actions/members.actions");
var Member_1 = require("../models/Member");
var EditContact = (function () {
    function EditContact(_store, menbersActions) {
        this._store = _store;
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
        core_1.Input(), 
        __metadata('design:type', Member_1.Member)
    ], EditContact.prototype, "editedContact", void 0);
    EditContact = __decorate([
        core_1.Component({
            selector: 'edit-contact',
            template: "<form (submit)=\"addNewContact()\" *ngIf=\"editedContact\" style=\"margin:20px;\">\n<div>\n<input [labelText]=\"'\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9:'\" [id]=\"editedContact.key + '_firstName'\"  type=\"text\" placeholder=\"\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9\" [(ngModel)]=\"editedContact.firstName\" name=\"firstName\"/>\n</div>\n\n<div><label [attr.for]=\"editedContact.key + '_lastName'\">\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4:</label>\n <input [id]=\"editedContact.key + '_lastName'\" type=\"text\" placeholder=\"\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4\" [(ngModel)]=\"editedContact.lastName\" name=\"lastName\"/></div>\n<div>\n\n<input [labelText]=\"'\u05DE\u05E1\u05E4\u05E8 \u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA:'\" [id]=\"editedContact.key + '_idNumber'\"  type=\"text\" placeholder=\"\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA\" [(ngModel)]=\"editedContact.idNumber\" name=\"idNumber\"/></div>\n<div>\n <input type=\"text\" name=\"phoneNumber\" [id]=\"editedContact.key + '_phoneNumber'\" [labelText]=\"'\u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF:'\"\n  [(ngModel)]=\"editedContact.phoneNumber\"></div>\n<div><input [id]=\"editedContact.key + '_city'\" [labelText]=\"'\u05D9\u05D9\u05E9\u05D5\u05D1:'\" type=\"text\" name=\"city\" [(ngModel)]=\"editedContact.city\"></div>\n<div><input [id]=\"editedContact.key + '_address'\" [labelText]=\"'\u05DB\u05EA\u05D5\u05D1\u05EA:'\" type=\"text\" name=\"address\" [(ngModel)]=\"editedContact.address\"></div>\n<div><input [id]=\"editedContact.key + '_eMail'\" [labelText]=\"'\u05DB\u05EA\u05D5\u05D1\u05EA \u05D3\u05D5\u05D0&quot;\u05DC:'\"  type=\"email\" placeholder=\"e-mail\"  [(ngModel)]=\"editedContact.eMail\" name=\"email\"/></div>\n<div><input [id]=\"editedContact.key + '_fromDate'\" [labelText]=\"'\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA:'\" type=\"date\" name=\"fromDate\" [(ngModel)]=\"editedContact.fromDate\"></div>\n<div><input  [id]=\"editedContact.key + '_toDate'\" [labelText]=\"'\u05EA\u05D0\u05E8\u05D9\u05DA \u05D0\u05D7\u05E8\u05D5\u05DF \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD:'\" type=\"date\" name=\"toDate\" [(ngModel)]=\"editedContact.toDate\"></div>\n<!--<div class=\"col-xs-1\" >-->\n<!--</div>-->\n<!--<div class=\"col-xs-1\" ><input type=\"text\" placeholder=\"\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4\" [(ngModel)]=\"editedContact.lastName\" name=\"lastName\"/>-->\n<!--</div>-->\n\n<!--<div class=\"col-xs-1\" ><input type=\"email\" placeholder=\"e-mail\"  [(ngModel)]=\"editedContact.eMail\" name=\"email\"/>-->\n<!--</div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"date\" name=\"fromDate\" [(ngModel)]=\"editedContact.fromDate\"></div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"date\" name=\"toDate\" [(ngModel)]=\"editedContact.toDate\"></div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"text\" name=\"city\" [(ngModel)]=\"editedContact.city\"></div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"text\" name=\"address\" [(ngModel)]=\"editedContact.address\"></div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"text\" name=\"phoneNumber\" [(ngModel)]=\"editedContact.phoneNumber\"></div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <a href=\"javascript:nvoid(0)\" (click)=\"removeSubscription()\">\u05D4\u05E1\u05E8\u05D4 \u05DE\u05E8\u05E9\u05D9\u05DE\u05D5\u05EA \u05EA\u05E4\u05D5\u05E6\u05D4</a> </div>-->\n<!--<div class=\"col-xs-1 hidden-xs\"> <input type=\"checkbox\" name=\"member\" [(ngModel)]=\"editedContact.member\"></div>-->\n\n\n<button type=\"button\" class=\"glyphicon glyphicon-remove\" (click)=\"revertChanges()\"></button>\n\n \n<button type=\"submit\" class=\"glyphicon glyphicon-floppy-disk\"></button>\n</form>"
        }), 
        __metadata('design:paramtypes', [app_store_1.Store, members_actions_1.MembersActions])
    ], EditContact);
    return EditContact;
}());
exports.EditContact = EditContact;
//# sourceMappingURL=EditContact.js.map