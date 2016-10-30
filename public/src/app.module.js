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
 * Created by ranwahle on 07/09/2016.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require("./app.component");
var app_store_1 = require("./app.store");
var app_actions_1 = require("./actions/app.actions");
var app_middlewars_1 = require("./middlewars/app.middlewars");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var EditContact_1 = require("./components/EditContact");
var ContactComponent_1 = require("./components/ContactComponent");
var app_routes_1 = require("./app.routes");
var register_component_1 = require("./components/auth/register.component");
var booleanPipe_1 = require("./pipes/booleanPipe");
var WelcomeComponent_1 = require("./components/WelcomeComponent");
var Spinner_1 = require("./components/Spinner");
var membersList_component_1 = require("./components/membersList.component");
var commomComponents_module_1 = require("./commonComponents/commomComponents.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routes_1.routing, commomComponents_module_1.CommonComponents],
            declarations: [app_component_1.AppComponent, WelcomeComponent_1.WelcomeComponent, membersList_component_1.MembersListComponent, EditContact_1.EditContact,
                ContactComponent_1.ContactComponent, register_component_1.RegisterComponent, booleanPipe_1.BooleanPipe, Spinner_1.SpinnerComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [app_store_1.Store].concat(app_actions_1.APP_ACTIONS, app_middlewars_1.APP_Middlewars)
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map