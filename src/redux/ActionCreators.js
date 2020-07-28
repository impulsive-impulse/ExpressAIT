import * as ActionTypes from './ActionTypes';
//import POSTS from '../shared/posts';
import axios from '../axios-posts.js';

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
})