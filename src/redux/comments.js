import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
	success:false,
	comments: null,
	errMess :null,
	isLoading:false
}, action) => {
    switch (action.type) {
    	case ActionTypes.ADD_COMMENT_SUCC:
            return {...state, success:true }

        case ActionTypes.LOAD_COMMENTS :
        	return {...state, comments :action.payload , isLoading:false}

        case ActionTypes.COMMENTS_FAILED:
        	return {...state, errMess :action.payload , isLoading:false}

        case ActionTypes.IS_LOADING :
        	return { ...state, isLoading:true}

        default: 
          return state;
      }
};