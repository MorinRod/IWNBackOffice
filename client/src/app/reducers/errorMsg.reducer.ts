import {Members} from '../constants/actions';
import {Action} from 'redux';

export function errorMsgReducer(state={},action){

	switch (action.type) {
		case Members.ErrorMessageAdded:
			return Object.assign({},state,{text: action.payload});
		
		case Members.ErrorMessageDeleted:
			return Object.assign({},state,{text: ''});

		default:
			return state;
	}
}
