/**
 * Created by ranwahle on 19/09/2016.
 */
import {Injectable} from "@angular/core";
import {Store} from "../app.store";
import {Server} from "../constants/actions";
@Injectable()
export class ServerActions{

    private store:Store;
    constructor(store:Store){
        this.store = store;
    }
    onServerCall(){
        this.store.dispatch({type: Server.OnServerCall});
    }

    dismissServerCall(){
        this.store.dispatch(({type:Server.DismissServerCall}));
    }
}