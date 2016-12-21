/**
 * Created by ranwahle on 07/09/2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var actions_1 = require("../constants/actions");
var MembersActions = (function () {
    function MembersActions(store) {
        this.store = store;
    }
    MembersActions.prototype.savePayment = function (payment) {
        this.store.dispatch({
            type: actions_1.Members.SavePayment,
            payload: payment
        });
    };
    MembersActions.prototype.getContacts = function () {
        this.store.dispatch({
            type: actions_1.Members.GetMembers
        });
    };
    MembersActions.prototype.getPayment = function (memberId) {
        this.store.dispatch({
            type: actions_1.Members.GetPayments,
            payload: { memberId: memberId }
        });
    };
    MembersActions.prototype.saveContact = function (contact) {
        this.store.dispatch({
            type: actions_1.Members.SaveMember,
            payload: contact
        });
    };
    MembersActions.prototype.deleteMember = function (member) {
        this.store.dispatch({ type: actions_1.Members.DeleteMember,
            payload: member
        });
    };
    MembersActions.prototype.addContact = function (contact) {
        this.store.dispatch({
            type: actions_1.Members.AddMember,
            payload: contact
        });
    };
    MembersActions = __decorate([
        core_1.Injectable()
    ], MembersActions);
    return MembersActions;
}());
exports.MembersActions = MembersActions;
