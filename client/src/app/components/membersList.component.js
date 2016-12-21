"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Member_1 = require("../models/Member");
/**
 * Created by ranwahle on 07/09/2016.
 */
var MembersListComponent = (function () {
    function MembersListComponent(_store, memberActions) {
        this._store = _store;
        this.memberActions = memberActions;
    }
    MembersListComponent.prototype.ngOnInit = function () {
        this.getContacts();
    };
    MembersListComponent.prototype.deleteMember = function (member) {
        this.memberActions.deleteMember(member);
    };
    MembersListComponent.prototype.addNewContact = function () {
        var member = new Member_1.Member();
        member.isEdited = true;
        this.memberActions.addContact(member);
    };
    MembersListComponent.prototype.getContacts = function () {
        this.memberActions.getContacts();
    };
    MembersListComponent.prototype.editContact = function (member) {
        member.isEdited = true;
    };
    MembersListComponent = __decorate([
        core_1.Component({
            selector: 'contacts-list-component',
            template: "<h2>\u05E8\u05E9\u05D9\u05DE\u05EA \u05D7\u05D1\u05E8\u05D9\u05DD \n({{_store.state.members ? _store.state.members.length : 0}})</h2>\n<a class=\"glyphicon glyphicon-plus\" href=\"javascript:void(0)\" \n(click)=\"addNewContact()\" title=\"\u05D7\u05D3\u05E9\" ></a>\n\n<button (click)=\"getContacts()\" class=\"glyphicon glyphicon-refresh\">\u05D8\u05E2\u05D9\u05E0\u05D4</button>\n<div *ngIf=\"_store.state.members && _store.state.members.length\">\n<div class=\"row\" >\n<div class=\"col-xs-1 header-row\">\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9</div>\n<div class=\"col-xs-1 header-row\">\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4</div>\n<div class=\"col-xs-1 header-row\">\u05EA\u05E2\u05D5\u05D3\u05EA \u05D6\u05D4\u05D5\u05EA</div>\n<div class=\"col-xs-1 header-row hidden-xs\">\u05D8\u05DC\u05E4\u05D5\u05DF</div>\n<div class=\"col-xs-1 header-row hidden-xs\">\u05D9\u05D9\u05E9\u05D5\u05D1</div>\n<div class=\"col-xs-1 header-row hidden-xs\">\u05DB\u05EA\u05D5\u05D1\u05EA</div>\n\n<div class=\"col-xs-2 header-row\">e-mail</div>\n<div class=\"col-xs-1 header-row hidden-xs\">\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA</div>\n<div class=\"col-xs-1 header-row hidden-xs\" >\u05EA\u05D0\u05E8\u05D9\u05DA \u05D0\u05D7\u05E8\u05D5\u05DF \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD</div>\n\n\n<!--<div class=\"col-xs-1 header-row\">\u05DE\u05E2\u05D5\u05E0\u05D9\u05D9\u05E0\u05EA \u05D1\u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD</div>-->\n<!--<div class=\"col-xs-1 header-row\">\u05DE\u05E2\u05D5\u05E0\u05D9\u05D9\u05E0\u05EA \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3</div>-->\n</div>\n<div class=\"spacerDiv\"></div>\n<div class=\"row\" *ngFor=\"let member of _store.state.members \">\n\n<contact-component *ngIf=\"member && !member.isEdited\" [contact]=\"member\"></contact-component>\n<div class=\"col-xs-1\" *ngIf=\"!member.isEdited\" >\n<a class=\"glyphicon glyphicon-pencil\" href=\"javascript:void(0)\" title=\"\u05E2\u05E8\u05D9\u05DB\u05D4\"\n (click)=\"editContact(member)\"></a>\n <a class=\"glyphicon glyphicon-erase\" title=\"\u05DE\u05D7\u05D9\u05E7\u05D4\" (click)=\"deleteMember(member)\"></a>\n </div>\n \n<edit-contact *ngIf=\"member.isEdited\" [editedContact]=\"member\"></edit-contact>\n</div>\n\n<edit-contact *ngIf=\"newContact\" [editedContact]=\"_store.state.newContact\"></edit-contact>\n</div>\n"
        })
    ], MembersListComponent);
    return MembersListComponent;
}());
exports.MembersListComponent = MembersListComponent;
