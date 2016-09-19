import {UsersActions} from "../actions/users.actions";
import {Users} from "../constants/actions";
/**
 * Created by ranwahle on 15/09/2016.
 */
export function UsersReducer   (state = [], action) {

    switch (action.type) {
        case Users.SetCurrentUser:{
            return [...action.payload];
        }

        case Users.CurrentUserLoaded:{
            return [action.payload];
        }
        case Users.LoadingError:{
            return null;
        }
        case Users.LogOut:{
            return null;
        }
    }
    return state;
}