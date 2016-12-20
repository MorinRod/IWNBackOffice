import {Members} from "../constants/actions";
import {Action} from "redux";
/**
 * Created by ranwahle on 19/12/2016.
 */


export function paymentsReducer(state = {}, action) {

  switch (action.type) {
    case  Members.PaymentsLoaded: {
      return Object.assign({}, state, {payments: action.payload});
    }
    default: {
      return state;
    }
  }
}
