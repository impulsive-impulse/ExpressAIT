import React, { Component} from 'react';
import Header from './HeaderComponent';
import Blogs from './PostsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FullPost from './FullPostComponent';
import { addComment, fetchPosts } from '../redux/ActionCreators';
import NewPost from './NewPost'; 

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => ({

addComment: (postId, rating, author, comment) => dispatch(addComment(postId, rating, author, comment)),
fetchPosts: () => {dispatch(fetchPosts())}

});

class Main extends Component {

	componentDidMount(){
		this.props.fetchPosts();
	}

	render(){
		const postWithId = ({match}) => {
			console.log(match.params);
			return(
					<FullPost post={this.props.posts.posts.filter((post)=> post.id === match.params.postId)[0]} 
					  comments={this.props.comments.filter((comment) => comment.postId == match.params.postId)}
					  addComment={this.props.addComment}
					  postId={match.params.postId}
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

		return(
			<>
				<Header/>
				<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/home/:postId" component={postWithId} />
				<Route path="/new" component={NewPost} />
				<Redirect to="/" />				
				</Switch>
			</>
			);
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));