import React, { Component} from 'react';
import Header from './HeaderComponent';
import Home from './PostsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FullPost from './FullPostComponent';

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

class Main extends Component {

	render(){

			const postWithId = ({match}) => {
				console.log(match.params);
				return(
						<FullPost post={this.props.posts.filter((post)=> post.id == match.params.postId)[0]} 
								  comments={this.props.comments.filter((comment) => comment.postId == match.params.postId)}
						/>
					);
			}


		return(
			<>
				<Header/>
				<Switch>
				<Route exact path="/" component={() => <Home posts={this.props.posts} />}/>
				<Route path="/home/:postId" component={postWithId} />
				<Redirect to="/" />
				
				</Switch>
			</>
			);
	}
}

export default withRouter(connect(mapStateToProps)(Main));