import * as ActionTypes from './ActionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    displayName: null
};

const reducer = ( state =initialState, action) => {
	switch(action.type){
		case ActionTypes.AUTH_START:
			return {...state, loading: true, error: null}
		case ActionTypes.AUTH_SUCCESS:
			return {...state, token: action.idToken, userId: action.userId, error: null, loading: false, displayName: action.displayName}
		case ActionTypes.AUTH_FAIL:
			return {...state, loading: false, error: action.error}
		case ActionTypes.AUTH_LOGOUT:
			return {...state, token: null, userId: null, displayName: null}

		default :
			return state
	}
};

export default reducer;