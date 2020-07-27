import * as ActionTypes from './ActionTypes';

export const NewPost = (state ={
	errMess: null,
	isLoading:false,
	redirect: false
}, action) => {
	switch(action.type){
		case ActionTypes.NEWPOST_LOADING :
			return {...state, isLoading: true,errMess:null }

		case ActionTypes.NEWPOST_FAILED :
			return {...state, isLoading:false , errMess: action.payload}

		case ActionTypes.NEWPOST_SUC :
			return {...state, isLoading:false, errMess:null, redirect:true}

		default : 
			return state
	}
}
