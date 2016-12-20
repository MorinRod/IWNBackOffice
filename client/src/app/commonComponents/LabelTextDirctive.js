"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
/**
 * Created by ranwahle on 09/10/2016.
 */
var LabelTextDirctive = (function () {
    function LabelTextDirctive(el, renderer) {
        this.el = el;
    }
    LabelTextDirctive.prototype.ngOnInit = function () {
        var _this = this;
        this.label = document.createElement('label');
        this.label.innerText = this.labelText;
        this.el.nativeElement.parentElement.insertBefore(this.label, this.el.nativeElement);
        window.setTimeout(function () { return _this.label.setAttribute('for', _this.el.nativeElement.id); });
    };
    __decorate([
        core_2.Input()
    ], LabelTextDirctive.prototype, "labelText", void 0);
    LabelTextDirctive = __decorate([
        core_1.Directive({
            selector: '[labelText]'
        })
    ], LabelTextDirctive);
    return LabelTextDirctive;
}());
exports.LabelTextDirctive = LabelTextDirctive;
