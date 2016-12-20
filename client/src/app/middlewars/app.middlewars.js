"use strict";
var UserMiddleware_1 = require("./UserMiddleware");
var MembersMiddleWare_1 = require("./MembersMiddleWare");
var PaymentsMiddleware_1 = require("./PaymentsMiddleware");
/**
 * Created by ranwahle on 08/09/2016.
 */
exports.APP_Middlewars = [MembersMiddleWare_1.MembersMiddleware, UserMiddleware_1.UserMiddleware, PaymentsMiddleware_1.PaymentsMiddleware];
