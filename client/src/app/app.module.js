"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require("./app.routes");
var membersList_component_1 = require("./components/membersList.component");
var register_component_1 = require("./components/auth/register.component");
var WelcomeComponent_1 = require("./components/WelcomeComponent");
var Spinner_1 = require("./components/Spinner");
var ContactComponent_1 = require("./components/ContactComponent");
var commomComponents_module_1 = require("./commonComponents/commomComponents.module");
var app_store_1 = require("./app.store");
var app_middlewars_1 = require("./middlewars/app.middlewars");
var app_actions_1 = require("./actions/app.actions");
var EditContact_1 = require("./components/EditContact/EditContact");
var contacts_component_1 = require("./components/contacts.component");
var booleanPipe_1 = require("./pipes/booleanPipe");
var member_payment_component_1 = require('./components/member-payment/member-payment.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                membersList_component_1.MembersListComponent,
                register_component_1.RegisterComponent,
                WelcomeComponent_1.WelcomeComponent,
                Spinner_1.SpinnerComponent,
                ContactComponent_1.ContactComponent,
                contacts_component_1.ContactsComponent,
                booleanPipe_1.BooleanPipe,
                EditContact_1.EditContact,
                member_payment_component_1.MemberPaymentComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routes_1.routing,
                commomComponents_module_1.CommonComponents
            ],
            providers: [app_store_1.Store].concat(app_actions_1.APP_ACTIONS, app_middlewars_1.APP_Middlewars),
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
