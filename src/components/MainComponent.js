import React, { Component} from 'react';
import Header from './HeaderComponent';
import Blogs from './PostsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FullPost from './FullPostComponent';
import { addComment, fetchPosts , fetchComments, authCheckState} from '../redux/ActionCreators';
import NewPost from './NewPost'; 
import EditPost from './EditPost';
import MyPosts from './MyPosts';

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => ({

addComment: (data) => dispatch(addComment(data)),
fetchPosts: () => {dispatch(fetchPosts())},
fetchComments: () => dispatch(fetchComments()),
autoSignup: () => dispatch(authCheckState())

});

class Main extends Component {

	componentDidMount(){
		this.props.fetchPosts();
		this.props.fetchComments();
		this.props.autoSignup();
	}

	render(){

		const postWithId = ({match}) => {
			return(
					<FullPost post={this.props.posts.posts.filter((post)=> post.id === match.params.postId)[0]} 
					  addComment={this.props.addComment}
					  comments={this.props.comments.comments.filter((comment) => comment.postId === match.params.postId)}
					  postId={match.params.postId}
					  isAuthenticated={this.props.isAuthenticated}
					/>
				);
		}

		const Home =() => {
			return(
				<Blogs posts={this.props.posts} 
						isLoading={this.props.posts.isLoading}
						errMess={this.props.posts.errMess}/>
				)
		}

		let routes = (
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/home/:postId" component={postWithId} />
					<Redirect to="/" />
				</Switch>
			);

		if( this.props.isAuthenticated){
			routes = (
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/home/myPosts" component={MyPosts}/>
					<Route path="/home/:postId/edit" component={EditPost}/>
					<Route path="/home/:postId" component={postWithId} />
					<Route path="/new" component={NewPost} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return(
			<>
				<Header/>
				{routes}
			</>
			);
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));