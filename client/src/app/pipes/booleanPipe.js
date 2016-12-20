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
var BooleanPipe = (function () {
    function BooleanPipe() {
    }
    BooleanPipe.prototype.transform = function (value, trueString, falseString) {
        if (trueString === void 0) { trueString = '<span class="glyphicon glyphicon-ok">&nbsp;</span>'; }
        if (falseString === void 0) { falseString = '<span class="glyphicon glyphicon-remove">&nbsp;</span>'; }
        return value ? trueString : falseString;
    };
    BooleanPipe = __decorate([
        core_1.Pipe({ name: 'booleanpipe'
        })
    ], BooleanPipe);
    return BooleanPipe;
}());
exports.BooleanPipe = BooleanPipe;
