import * as ActionTypes from './ActionTypes';
//import POSTS from '../shared/posts';
import axios from '../axios-posts.js';

export const addComment = (postId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        postId: postId,
        rating: rating,
        author: author,
        comment: comment
    }
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

export const addNewPost = (data) =>(dispatch) => {

	dispatch(newPostLoading);

	return (dispatch) => {
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
  };
};

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