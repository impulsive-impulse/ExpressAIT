import * as ActionTypes from './ActionTypes';
//import POSTS from '../shared/posts';
import axios from '../axios-posts.js';
import axiosAuth from 'axios';

export const addComment = (data) => {
    var comment=data;
    comment.date = new Date().toISOString();
    return (dispatch) => {
      axios
        .post('/comments.json',comment)
        .then((res) => {
          dispatch(addCommentSucc());
        })
        .catch((err) => {
          console.log(err);
        })
    }   
};

export const addCommentSucc =() => ({
    type: ActionTypes.ADD_COMMENT_SUCC
});

export const fetchComments =() => (dispatch) => {
    dispatch(commentsLoading());
    axios
      .get('/comments.json')
      .then((res) => {
          dispatch(loadComments(res.data));
      })
      .catch((err) => {
          dispatch(commentsFailed());
      })
};

export const commentsLoading=() =>({
    type : ActionTypes.IS_LOADING
});

export const loadComments= (comments) =>{
    let commentsArray = [];
    for(let key in comments){
      commentsArray.push({...comments[key], id : key });
    }
    
    return {
      type : ActionTypes.LOAD_COMMENTS,
      payload : commentsArray
    };
};

export const commentsFailed =(errMess) =>({
    type : ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const fetchPosts = () => (dispatch) => {

    dispatch(postsLoading(true));
    axios
    	.get('/posts.json')
    	.then((res) => {
    		console.log(res);
    		dispatch(addPosts(res.data));
    	})
    	.catch((err) => {
    		dispatch(postsFailed(err));
    	});
};

export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts = (posts) => {
  let fetchedPosts = [];
  for (let key in posts) {
    fetchedPosts.push({ ...posts[key], id: key });
  }
  return {
    type: ActionTypes.ADD_POSTS,
    payload: fetchedPosts,
  };
};

export const addNewPost = (data) => {

	return (dispatch) => {
    dispatch(newPostLoading);

    axios
      .post('/posts.json', data)
      .then((response) => {
      	console.log(response.data);
        dispatch(newPostSuc());
      })
      .catch((err) => {
        console.log(err);
        dispatch(newPostFailed(err));
      });
    
    setTimeout(() => {
        dispatch(switchRedirect());
    }, 2000);

  };
};

export const switchRedirect = () => {
  return {
    type : ActionTypes.SWITCH_REDIRECT
  }
}

export const newPostLoading = () => {
	return{
		type: ActionTypes.NEWPOST_LOADING
	};
};

export const newPostFailed =(errMess) => ({
	type: ActionTypes.NEWPOST_FAILED,
	payload: errMess
}) ;

export const newPostSuc =() => ({
	type: ActionTypes.NEWPOST_SUC
});

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, displayName) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        displayName: displayName
    };
};

export const authFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('displayName');
  return{
      type: ActionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authSignUp = (email, password , firstName , lastName) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email : email,
      password : password,
      displayName: firstName+ " " + lastName,
      returnSecureToken: true
    };

    axiosAuth
    .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiLEXehz6KH485lUUFi2gn30NwQn2PiPs',authData)
    .then(response => {
        //console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('displayName', response.data.displayName);
        dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err));
    })
  };
};

export const authSignIn = (email ,password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email : email,
      password : password,
      returnSecureToken: true
    };

    axiosAuth
    .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiLEXehz6KH485lUUFi2gn30NwQn2PiPs',authData)
    .then(response => {
      //console.log(response);
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('displayName', response.data.displayName);
      dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err =>{
      console.log(err);
      dispatch(authFail(err));
    })
  };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const displayName = localStorage.getItem('displayName');
                dispatch(authSuccess(token, userId, displayName));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};