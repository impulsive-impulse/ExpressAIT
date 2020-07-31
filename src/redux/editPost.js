import * as ActionTypes from './ActionTypes';

const InitialState = {
	title: null,
	author: null,
	error: null,
	content: null,
	image:null
};

const reducer = (state= InitialState, action) => {
	switch(action.type){
		case ActionTypes.EDIT_POST_GET_DATA_SUCCESS :
			return {...state, title: action.title, author: action.author, content: action.content, eror: null }
		case ActionTypes.EDIT_POST_GET_DATA_FAIL :
			return {...state, error: action.error}
		case ActionTypes.UPDATE_EDIT_POST_STATE :
			return {...state, title: action.title, author: action.author, content: action.content, eror: null}
		case ActionTypes.UPDATE_POST_TITLE:
			return {...state, title: action.newTitle}
		case ActionTypes.UPDATE_POST_CONTENT:
			return {...state, content: action.newContent}
		default:
			return state;
	}
};

export default reducer;
