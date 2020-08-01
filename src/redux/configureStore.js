import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import {Posts} from './posts';
import {Comments} from './comments';
import {NewPost} from './newPost';
import Auth from './auth';
import EditPost from './editPost';
import MyPosts from './myPosts';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        	posts:Posts,
        	comments: Comments,
        	newPost: NewPost,
        	auth: Auth,
            editPost: EditPost,
            myPosts: MyPosts
        }),
       composeEnhancers(applyMiddleware(thunk,logger))
    );
    return store;
}