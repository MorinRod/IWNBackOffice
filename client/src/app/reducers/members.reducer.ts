import {Members} from "../constants/actions";
/**
 * Created by ranwahle on 07/09/2016.
 */
export function membersReducer(state = [], action){
    switch (action.type){
        case Members.Filter:{
            return [];

        }
        case Members.GetMembers:{
            return [...state];
        }

        case Members.Loaded:{
            return [...action.payload];
        }
        case Members.AddMember:{
            return [...state, action.payload];
        }
        case Members.LoadingError:{
            return Object.assign({}, state,  {status: action.payload} );
        }
    }
    return [];
}