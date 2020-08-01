import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchMyPosts, authCheckState} from '../redux/ActionCreators';
import {Loading} from './LoadingComponent';
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';

class MyPosts extends Component {

	componentDidMount(){
		this.props.fetchMyPosts(this.props.userId);
	}

	render(){

	const imgStyle = {
	  maxHeight: 64,
	  maxWidth: 64
	}

	const RenderPost = (post) => {

	    return(
	        <Media tag="li">
	            <Media left middle>
	                <Media object style={imgStyle} src={post.post.image} alt={post.post.title} />
	            </Media>
	            <Link to={"/home/"+ post.post.id}>
	            <Media body className="ml-5">
	                <Media heading>{post.post.title}</Media>
	                <p>--{post.post.author}</p>
	            </Media>
	            </Link>
	        </Media>
	    );
	}

	const PostList = () => {

		if (this.props.isLoading) {
	        return(
	            <Loading />
	        );
	    }
	    else if (this.props.error) {
	        return(
	            <h4>{this.props.error.message}</h4>
	        );
	    }
	    else{
	    	if(this.props.myPosts.length===0){
				return(
					<h3>You Have No Posts</h3>
				);
			}

	    	const posts = this.props.myPosts.map((post) => {
		        return (
		            <div key={post.id}>
		                <div className="col-12 mt-2">
		                    <RenderPost post={post} />
		                </div>
		            </div>
		        );
		    });
		
		    return (
		        <Media list>
		            {posts}
		        </Media>
		    );
	    } 
	}


		return(
			<div className = "container">
				<div className="row row-content">
					<div className="col-md-10">
						<PostList posts={this.props.myPosts}
							isLoading={this.props.isLoading} 
							errMess={this.props.error}/>
					</div>
				</div>
			</div>
		);
	}
} 

const mapStateToProps = state => {
  return {
  		myPosts: state.myPosts.myPosts,
  		isLoading: state.myPosts.isLoading,
  		error: state.myPosts.error,
  		userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => ({
	fetchMyPosts:(userId) => dispatch(fetchMyPosts(userId)),
	autoSignup: () => dispatch(authCheckState())
});

export default connect(mapStateToProps,mapDispatchToProps)(MyPosts);