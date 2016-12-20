
import {UserMiddleware} from "./UserMiddleware";
import {MembersMiddleware} from "./MembersMiddleWare";
import {PaymentsMiddleware} from "./PaymentsMiddleware";
/**
 * Created by ranwahle on 08/09/2016.
 */
export const APP_Middlewars = [MembersMiddleware, UserMiddleware, PaymentsMiddleware];
