"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var actions_1 = require('../constants/actions');
/**
 * Created by ranwahle on 07/09/2016.
 */
var MembersMiddleware = (function () {
    function MembersMiddleware(_http) {
        var _this = this;
        this.middleware = function (store) { return function (next) { return function (action) {
            console.debug('members middleware action', action);
            if (action.type === actions_1.Members.GetMembers) {
                return _this.getContacts(store, next);
            }
            else if (action.type === actions_1.Members.Loaded ||
                action.type === actions_1.Members.LoadingError) {
            }
            else if (action.type === actions_1.Members.SaveMember) {
                var addContactSuccessHandler = function (result) {
                    var newPayload = _this.setChangedMember(store, action.payload);
                    return next({ type: actions_1.Members.Loaded, payload: newPayload });
                };
                var errorHandler = function (error) { return next({
                    type: actions_1.Members.LoadingError,
                    payload: error.json()
                }); };
                _this._http.post(_this.url, action.payload)
                    .subscribe(addContactSuccessHandler, errorHandler);
            }
            else {
                return next(action);
            }
        }; }; };
        this._http = _http;
        this.url = 'http://iwndataservices20161217050028.azurewebsites.net/api/members';
        //  'http://10.0.0.6/IWNDataServices/api/members';
        //'http://iwndataservices20161217050028.azurewebsites.net/api/members';
    }
    MembersMiddleware.prototype.setChangedMember = function (store, savedMember) {
        savedMember.isEdited = false;
        var members = store.getState().members;
        var changedMember = members.find(function (member) { return member.key === savedMember.key; });
        if (!changedMember) {
            members.push(savedMember);
        }
        else {
            members[members.indexOf(changedMember)] = savedMember;
        }
        return members;
    };
    MembersMiddleware.prototype.getContacts = function (store, next) {
        var self = this;
        var successHandler = function (result) {
            store.dispatch({ type: actions_1.Server.DismissServerCall });
            console.log('contacts result', result);
            var results = result.json();
            results.forEach(function (contact) {
                contact.isEdited = false;
                if (!contact.eMail) {
                    contact.eMail = contact.email;
                }
            });
            return next({
                type: actions_1.Members.Loaded,
                payload: results
            });
        };
        var errorHandler = function (error) {
            console.log('error', error);
            store.dispatch({ type: actions_1.Server.DismissServerCall });
            if (error.status === 401) {
                store.dispatch({ type: actions_1.Users.LogOut });
            }
            return next({
                type: actions_1.Members.LoadingError,
                payload: error.status
            });
        };
        this._http.get(this.url).subscribe(successHandler, errorHandler);
        return next({ type: actions_1.Server.OnServerCall });
    };
    MembersMiddleware = __decorate([
        core_1.Injectable()
    ], MembersMiddleware);
    return MembersMiddleware;
}());
exports.MembersMiddleware = MembersMiddleware;
