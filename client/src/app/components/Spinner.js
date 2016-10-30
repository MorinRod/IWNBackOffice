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
var core_1 = require("@angular/core");
/**
 * Created by ranwahle on 19/09/2016.
 */
var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent = __decorate([
        core_1.Component({
            template: " <div class='uil-spin-css' style='-webkit-transform:scale(0.6)'><div>\n <div></div></div><div><div></div></div>\n <div><div></div></div><div><div></div></div><div>\n <div></div></div><div><div></div></div><div><div></div></div>\n <div><div></div></div></div>",
            selector: 'spinner'
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=Spinner.js.map