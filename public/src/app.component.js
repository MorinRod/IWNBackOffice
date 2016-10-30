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
 * Created by ranwahle on 07/09/2016.
 */
var core_1 = require('@angular/core');
var app_store_1 = require("./app.store");
var users_actions_1 = require("./actions/users.actions");
var AppComponent = (function () {
    function AppComponent(_store, userActions) {
        this._store = _store;
        this.userActions = userActions;
        this.userActions.getCurrnetUser();
    }
    Object.defineProperty(AppComponent.prototype, "isLogedIn", {
        get: function () {
            return this._store.state.currentUser && this._store.state.currentUser.length
                && this._store.state.currentUser[this._store.state.currentUser.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        core_1.Component({
            template: " <h1 class=\"title\">\u05E9\u05D3\u05D5\u05DC\u05EA \u05D4\u05E0\u05E9\u05D9\u05DD </h1>\n <span *ngIf=\"_store.state.currentUser && _store.state.currentUser.length \n  &&  _store.state.currentUser[0]\">\n \n   \u05E9\u05DC\u05D5\u05DD   {{_store.state.currentUser[0].name}}\n</span>\n\n  <nav>\n    <a *ngIf=\"isLogedIn \" [routerLink]=\"['/members-screen']\">\u05D7\u05D1\u05E8\u05D9\u05DD</a>\n    <a *ngIf=\"!isLogedIn\" [routerLink]=\"['/login']\">\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA</a>\n    <a *ngIf= \"isLogedIn\" href=\"javascript:void(0)\" (click)=\"userActions.logOut()\">\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA</a>\n  </nav>\n  <spinner *ngIf=\"_store.state.OnServerCall.loading\"></spinner>\n  <router-outlet></router-outlet>",
            selector: 'my-app'
        }), 
        __metadata('design:paramtypes', [app_store_1.Store, users_actions_1.UsersActions])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map