import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Server, Members, Users} from "../constants/actions";
import {Payment} from "../models/payment";
import { AuthHttp }  from 'angular2-jwt';

/**
 * Created by ranwahle on 19/12/2016.
 */


@Injectable()
export class PaymentsMiddleware {

  private url: string;

  constructor(private http: Http,private authHttp:AuthHttp) {
    this.url = 'http://iwndataservices20161217050028.azurewebsites.net/api/payments';//http://10.0.0.6/IWNDataServices/api/payments';
  }

  setChangedPayment(payments: Payment[], payment: Payment): Payment[]{

    if (!payments.find(p => p.transactionId === payment.transactionId)){
      return [...payments, payment];
    }
    return payments;

  }
  savePayments(store, next, action){
    let self = this;
    const successHandler: (result) => any = result => {
      store.dispatch({type: Server.DismissServerCall});

      let results = result.json();
      console.debug('state', store);

      return next({
        type: Members.PaymentsLoaded,
        payload: this.setChangedPayment(store.getState().payments.payments  as Payment[], action.payload as Payment)
        //[...store.getState().payments.payments, action.payload]
      });
    };

    const errorHandler = error => {

      console.log('error', error);
      store.dispatch({type: Server.DismissServerCall});

      if (error.status === 401) {
        store.dispatch({type: Users.LogOut});
      }
      return next({
        type: Members.LoadingError,
        payload: error.status
      });
    };

    this.http.post(this.url, action.payload).subscribe(successHandler, errorHandler);
    return next({type: Server.OnServerCall});
  }

  getPayments(store, next, action) {

    let self = this;
    const successHandler = result => {
      store.dispatch({type: Server.DismissServerCall});

      let results = result.json();


      return next({
        type: Members.PaymentsLoaded,
        payload: results
      });
    };

    const errorHandler = error => {

      console.log('error', error);
      store.dispatch({type: Server.DismissServerCall});

      if (error.status === 401) {
        store.dispatch({type: Users.LogOut});
      }
      return next({
        type: Members.LoadingError,
        payload: error.status
      });
    }

    this.authHttp.get(this.url + '/' + action.payload.memberId).subscribe(successHandler, errorHandler);
    return next({type: Server.OnServerCall});

  }

  middleware = store => next => action => {
    console.debug('reached payment middleware');
    if (action.type === Members.GetPayments) {
      return this.getPayments(store, next, action);
    }
    else if (action.type === Members.SavePayment){
      return this.savePayments(store, next, action);
    }

    return next(action);

  }
}
