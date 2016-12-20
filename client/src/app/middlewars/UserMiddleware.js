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
var UserMiddleware = (function () {
    function UserMiddleware(_http, _router) {
        var _this = this;
        this.middleware = function (store) { return function (next) { return function (action) {
            if (action.type === actions_1.Users.GetCurrentUser) {
                var successHandler = function (result) {
                    console.log('current user result', result);
                    var results = result.json();
                    return next({
                        type: actions_1.Users.CurrentUserLoaded,
                        payload: results
                    });
                };
                var errorHandler = function (error) { return next({
                    type: actions_1.Users.LoadingError,
                    payload: null
                }); };
                _this._http.get(_this.url).subscribe(successHandler, errorHandler);
            }
            else if (action.type === actions_1.Users.LogOut) {
                var self_1 = _this;
                var handler = function (result) {
                    self_1._router.navigate(['/']);
                    return next({
                        type: actions_1.Users.CurrentUserLoaded,
                        payload: null
                    });
                };
                _this._http.get(_this.baseUrl + '/logout').subscribe(handler, handler);
            }
            return next(action);
        }; }; };
        this.baseUrl = 'http://localhost:5000',
            this._http = _http;
        this.url = this.baseUrl + '/currentUser';
        this._router = _router;
    }
    UserMiddleware = __decorate([
        core_1.Injectable()
    ], UserMiddleware);
    return UserMiddleware;
}());
exports.UserMiddleware = UserMiddleware;
