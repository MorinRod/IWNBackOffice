"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var actions_1 = require("../constants/actions");
var core_1 = require("@angular/core");
/**
 * Created by ranwahle on 14/09/2016.
 */
var UsersActions = (function () {
    function UsersActions(store) {
        this.store = store;
    }
    UsersActions.prototype.setCurrentUser = function (user) {
        this.store.dispatch({ type: actions_1.Users.SetCurrentUser, payload: user });
    };
    UsersActions.prototype.getCurrnetUser = function () {
        this.store.dispatch({ type: actions_1.Users.GetCurrentUser });
    };
    UsersActions.prototype.logOut = function () {
        this.store.dispatch({ type: actions_1.Users.LogOut });
    };
    UsersActions = __decorate([
        core_1.Injectable()
    ], UsersActions);
    return UsersActions;
}());
exports.UsersActions = UsersActions;
