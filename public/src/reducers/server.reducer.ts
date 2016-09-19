import {Server} from "../constants/actions";
/**
 * Created by ranwahle on 19/09/2016.
 */

export function serverReducer(state = [], action){
    switch (action.type){
        case Server.OnServerCall:{
            return Object.assign({}, state, {loading: true} ) ;
        }
        case Server.DismissServerCall:{
            return Object.assign({}, state, {loading: false} ) ;
        }
    }

    return state;
}