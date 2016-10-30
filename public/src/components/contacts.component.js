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
 * Created by ranwahle on 13/09/2016.
 */
var core_1 = require("@angular/core");
var ContactsComponent = (function () {
    function ContactsComponent() {
    }
    ContactsComponent = __decorate([
        core_1.Component({
            template: "<h1>\u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E9\u05D3\u05D5\u05DC\u05EA \u05D4\u05E0\u05E9\u05D9\u05DD</h1>\n    <router-outlet></router-outlet>\n    <contacts-list-component></contacts-list-component>\n    <edit-contact></edit-contact>"
        }), 
        __metadata('design:paramtypes', [])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=contacts.component.js.map