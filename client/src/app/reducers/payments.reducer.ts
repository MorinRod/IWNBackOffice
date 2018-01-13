import {Members} from "../constants/actions";
import {Action} from "redux";
/**
 * Created by ranwahle on 19/12/2016.
 */


export function paymentsReducer(state = [], action) {
  	switch (action.type) {
	    case  Members.PaymentsLoaded: {
	      return Object.assign([], state, {payments: action.payload});
	    }
	    case Members.SavePayment: {
      	console.log('state', state);
      	return [...state, action.payload];
    	}
	    case Members.DeletePayment:{
	    	return Object.assign([],state.filter(function(payment) {return payment=>payment.transactionId != action.payload.transactionId}));
	    }
	    default: {
	      return state;
	    }
  }
}
