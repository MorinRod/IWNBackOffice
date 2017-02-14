"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by ranwahle on 07/09/2016.
 */
var redux_1 = require('redux');
var root_1 = require('./reducers/root');
var core_1 = require("@angular/core");
var Store = (function () {
    function Store(members, currentUser, paymentMiddleware) {
        var _this = this;
        var middlewares = [members.middleware, currentUser.middleware, paymentMiddleware.middleware];
        this.store = redux_1.createStore(root_1.RootReducer, redux_1.applyMiddleware.apply(void 0, middlewares));
        //  applyMiddleware(currentUser.middleware)
        //  let store = createStore(reducer, window.devToolsExtension && window.devToolsExtension()););
        this.store.subscribe(function () { return console.log('State', _this.state); });
    }
    Object.defineProperty(Store.prototype, "state", {
        get: function () {
            return this.store.getState();
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    Store = __decorate([
        core_1.Injectable()
    ], Store);
    return Store;
}());
exports.Store = Store;
