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
 * Created by ranwahle on 12/09/2016.
 */
var core_1 = require("@angular/core");
var Member_1 = require("../models/Member");
var ContactComponent = (function () {
    function ContactComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Member_1.Member)
    ], ContactComponent.prototype, "contact", void 0);
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact-component',
            template: "<div class=\"col-xs-1\">&nbsp;{{contact.firstName}}</div>\n<div class=\"col-xs-1\">&nbsp;{{contact.lastName}}</div>\n<div class=\"col-xs-1\">{{contact.idNumber}}</div>\n<div class=\"col-xs-1 hidden-xs\">&nbsp;{{contact.phoneNumber}}</div>\n<div class=\"col-xs-1 hidden-xs\">&nbsp;{{contact.city}}</div>\n<div class=\"col-xs-1 hidden-xs\">&nbsp;{{contact.address}}</div>\n<div class=\"col-xs-2\">&nbsp;{{contact.eMail}}</div>\n<div class=\"col-xs-1 hidden-xs\">&nbsp;{{contact.fromDate}}</div>\n<div class=\"col-xs-1 hidden-xs\" >&nbsp;{{contact.toDate}}</div>\n\n\n\n<!--<div class=\"col-xs-1\" [innerHTML]=\"contact.wantUpdates | booleanpipe\"></div>-->\n<!--<div class=\"col-xs-1\" [innerHTML]=\"contact.member | booleanpipe\"></div>-->\n"
        }), 
        __metadata('design:paramtypes', [])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=ContactComponent.js.map