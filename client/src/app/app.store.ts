/**
 * Created by ranwahle on 07/09/2016.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {RootReducer} from './reducers/root';
import {Injectable} from "@angular/core";
import {UserMiddleware} from "./middlewars/UserMiddleware";
import {MembersMiddleware} from "./middlewars/MembersMiddleWare";
import {PaymentsMiddleware} from "./middlewars/PaymentsMiddleware";

@Injectable()
export class Store {
    private store;

    constructor(members:MembersMiddleware, currentUser:UserMiddleware, paymentMiddleware: PaymentsMiddleware){
        let middlewares = [members.middleware, currentUser.middleware, paymentMiddleware.middleware];
       this.store = createStore(RootReducer,
         compose( applyMiddleware(...middlewares)));
         //  applyMiddleware(currentUser.middleware)

         //  let store = createStore(reducer, window.devToolsExtension && window.devToolsExtension()););

        this.store.subscribe(() => console.log('State',this.state));
    }
    get state(){
        return this.store.getState();
    }





    dispatch(action){
        this.store.dispatch(action)
    }
}
