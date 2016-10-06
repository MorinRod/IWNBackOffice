import {Members} from "../constants/actions";
/**
 * Created by ranwahle on 07/09/2016.
 */
export function membersReducer(state = [], action){
    switch (action.type){
        case Members.Filter:{
            return [];

        }
        case Members.GetContacts:{
            return [...state];
        }

        case Members.Loaded:{
            return [...action.payload];
        }
        case Members.AddContact:{
            return [...state, action.payload];
        }
    }
    return [];
}