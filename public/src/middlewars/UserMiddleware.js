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
var actions_1 = require("../constants/actions");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
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
                _this._http.get('/logout').subscribe(handler, handler);
            }
            return next(action);
        }; }; };
        this._http = _http;
        this.url = '/currentUser';
        this._router = _router;
    }
    UserMiddleware = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], UserMiddleware);
    return UserMiddleware;
}());
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=UserMiddleware.js.map