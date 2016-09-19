/**
 * Created by ranwahle on 07/09/2016.
 */
import {createStore, applyMiddleware} from 'redux';
import {RootReducer} from './reducers/root';
import {ContactsMiddleWare} from "./middlewars/ContactsMiddleWare";
import {Injectable} from "@angular/core";
import {UserMiddleware} from "./middlewars/UserMiddleware";

@Injectable()
export class Store {
    private store;

    constructor(contacts:ContactsMiddleWare, currentUser:UserMiddleware){
        let middlewares = [contacts.middleware, currentUser.middleware];
       this.store = createStore(RootReducer,
           applyMiddleware(...middlewares)
         //  applyMiddleware(currentUser.middleware)
           );
         //  let store = createStore(reducer, window.devToolsExtension && window.devToolsExtension()););
    }
    get state(){
        return this.store.getState();
    }

    dispatch(action){
        this.store.dispatch(action)
    }
}