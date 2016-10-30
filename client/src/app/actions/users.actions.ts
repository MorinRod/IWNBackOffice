import {Store} from "../app.store";
import {User} from "../models/User";
import {Users} from "../constants/actions";
import {Injectable} from "@angular/core";
/**
 * Created by ranwahle on 14/09/2016.
 */

@Injectable()
export class UsersActions {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    setCurrentUser(user: User) {
        this.store.dispatch({type: Users.SetCurrentUser, payload: user});
    }

    getCurrnetUser(){
        this.store.dispatch({type:Users.GetCurrentUser});
    }

    logOut(){
        this.store.dispatch({type: Users.LogOut});
    }


}