import React, { Component} from 'react';
import Header from './HeaderComponent';
import Posts from '../shared/posts'
import Home from './PostsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import FullPost from './FullPostComponent';

class Main extends Component {

	render(){

			const postWithId = ({match}) => {
				console.log(match.params);
				return(
						<FullPost post={Posts.filter((post)=> post.id == match.params.postId)[0]}/>
					);
			}


		return(
			<>
				<Header/>
				<Switch>
				<Route exact path="/" component={() => <Home posts={Posts}/>}/>
				<Route path="/home/:postId" component={postWithId} />

				
				</Switch>
			</>
			);
	}
}

export default Main;