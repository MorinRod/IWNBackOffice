/**
 * Created by ranwahle on 13/09/2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var configuration_1 = require("../../constants/configuration");
var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    Object.defineProperty(RegisterComponent.prototype, "baseUrl", {
        get: function () {
            return configuration_1.configuration.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent = __decorate([
        core_1.Component({
            template: "\n    <a href=\"{{baseUrl}}/auth/google\" class=\"btn btn-danger\"><span class=\"fa fa-google-plus\"></span> Login With Google</a>\n"
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
