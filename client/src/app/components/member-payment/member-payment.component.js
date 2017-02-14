"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var payment_1 = require("../../models/payment");
var MemberPaymentComponent = (function () {
    function MemberPaymentComponent(_store, memberActions, route) {
        this._store = _store;
        this.memberActions = memberActions;
        this.route = route;
    }
    MemberPaymentComponent.prototype.getPayments = function () {
        this.memberActions.getPayment(this.memberId);
    };
    MemberPaymentComponent.prototype.editPayment = function (payment) {
        payment.isEdited = true;
    };
    MemberPaymentComponent.prototype.addNewPayment = function () {
        this.newPayment = new payment_1.Payment();
        this.newPayment.memberId = this.memberId;
    };
    MemberPaymentComponent.prototype.savePayment = function (payment) {
        console.debug('saving payment', payment);
        this.memberActions.savePayment(payment);
    };
    MemberPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.params.subscribe(function (param) {
            _this.memberId = param['id'];
            _this.getPayments();
        });
    };
    MemberPaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-member-payment',
            templateUrl: './member-payment.component.html',
            styleUrls: ['./member-payment.component.css']
        })
    ], MemberPaymentComponent);
    return MemberPaymentComponent;
}());
exports.MemberPaymentComponent = MemberPaymentComponent;
