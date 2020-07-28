import * as ActionTypes from './ActionTypes';

export const Posts = (state = { 
    isLoading : true,
	errMess : null,
	posts : null
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POSTS:
            return {...state, isLoading: false, errMess: null, posts: action.payload};

        case ActionTypes.POSTS_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.POSTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, posts: null};

        default:
            return state;
      }
};