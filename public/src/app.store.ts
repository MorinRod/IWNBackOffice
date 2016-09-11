/**
 * Created by ranwahle on 07/09/2016.
 */
import {createStore, applyMiddleware} from 'redux';
import {RootReducer} from './reducers/root';
import {ContactsMiddleWare} from "./middlewars/ContactsMiddleWare";
import {Injectable} from "@angular/core";

@Injectable()
export class Store {
    private store;

    constructor(contacts:ContactsMiddleWare){
       this.store = createStore(RootReducer, applyMiddleware(contacts.middleware));
    }
    get state(){
        return this.store.getState();
    }

    dispatch(action){
        this.store.dispatch(action)
    }
}