import {createStore, combineReducers} from 'redux';
import {Posts} from './posts';
import {Comments} from './comments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        	posts:Posts,
        	comments: Comments
        })
    );

    return store;
}