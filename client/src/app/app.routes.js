"use strict";
var router_1 = require('@angular/router');
var register_component_1 = require("./components/auth/register.component");
var WelcomeComponent_1 = require("./components/WelcomeComponent");
var membersList_component_1 = require("./components/membersList.component");
var member_payment_component_1 = require("./components/member-payment/member-payment.component");
var appRoutes = [
    { path: 'members-screen', component: membersList_component_1.MembersListComponent },
    { path: 'login', component: register_component_1.RegisterComponent },
    { path: 'payment/:id', component: member_payment_component_1.MemberPaymentComponent },
    { path: '', component: WelcomeComponent_1.WelcomeComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
var RoutesPaths = (function () {
    function RoutesPaths() {
        this.paths = appRoutes.map(function (route) { return route.path; });
    }
    return RoutesPaths;
}());
exports.RoutesPaths = RoutesPaths;
