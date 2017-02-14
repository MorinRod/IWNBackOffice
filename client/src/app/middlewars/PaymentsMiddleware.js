"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var actions_1 = require("../constants/actions");
/**
 * Created by ranwahle on 19/12/2016.
 */
var PaymentsMiddleware = (function () {
    function PaymentsMiddleware(http) {
        var _this = this;
        this.http = http;
        this.middleware = function (store) { return function (next) { return function (action) {
            console.debug('reached payment middleware');
            if (action.type === actions_1.Members.GetPayments) {
                return _this.getPayments(store, next, action);
            }
            else if (action.type === actions_1.Members.SavePayment) {
                return _this.savePayments(store, next, action);
            }
            return next(action);
        }; }; };
        this.url = 'http://iwndataservices20161217050028.azurewebsites.net/api/payments'; //http://10.0.0.6/IWNDataServices/api/payments';
    }
    PaymentsMiddleware.prototype.setChangedPayment = function (payments, payment) {
        if (!payments.find(function (p) { return p.transactionId === payment.transactionId; })) {
            return payments.concat([payment]);
        }
        return payments;
    };
    PaymentsMiddleware.prototype.savePayments = function (store, next, action) {
        var _this = this;
        var self = this;
        var successHandler = function (result) {
            store.dispatch({ type: actions_1.Server.DismissServerCall });
            var results = result.json();
            console.debug('state', store);
            return next({
                type: actions_1.Members.PaymentsLoaded,
                payload: _this.setChangedPayment(store.getState().payments.payments, action.payload)
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
        this.http.post(this.url, action.payload).subscribe(successHandler, errorHandler);
        return next({ type: actions_1.Server.OnServerCall });
    };
    PaymentsMiddleware.prototype.getPayments = function (store, next, action) {
        var self = this;
        var successHandler = function (result) {
            store.dispatch({ type: actions_1.Server.DismissServerCall });
            var results = result.json();
            return next({
                type: actions_1.Members.PaymentsLoaded,
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
        this.http.get(this.url + '/' + action.payload.memberId).subscribe(successHandler, errorHandler);
        return next({ type: actions_1.Server.OnServerCall });
    };
    PaymentsMiddleware = __decorate([
        core_1.Injectable()
    ], PaymentsMiddleware);
    return PaymentsMiddleware;
}());
exports.PaymentsMiddleware = PaymentsMiddleware;
