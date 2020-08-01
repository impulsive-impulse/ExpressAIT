import * as ActionTypes from './ActionTypes';

const InitialState ={
	myPosts: [],
	isLoading: false,
	error: null
}

const reducer = (state = InitialState, action) => {
	switch(action.type){
		case ActionTypes.FETCH_MY_POSTS_LOADING:
			return {...state, isLoading:true, error: null}
		case ActionTypes.FETCH_MY_POSTS_SUCCESS:
			return {...state, isLoading: false, error: null, myPosts:action.myPosts}
		case ActionTypes.FETCH_MY_POSTS_FAIL:
			return {...state, isLoading:false, error: action.error}
		default:
			return state;
	}
}

export default reducer;

