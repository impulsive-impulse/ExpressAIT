import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay,CardSubtitle,CardBody ,CardText, CardTitle, Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const imgStyle = {
  maxHeight: 64,
  maxWidth: 64
}

function RenderPost({post}) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object style={imgStyle} src={post.image} alt={post.title} />
            </Media>
            <Link to={"/home/"+ post.id}>
            <Media body className="ml-5">
                <Media heading>{post.title}</Media>
                <p>--{post.author}</p>
            </Media>
            </Link>
        </Media>
    );
}

function PostList (props){
	if (props.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <h4>{props.errMess}</h4>
        );
    }
    else{
    	const posts = props.posts.posts.map((post) => {
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

function Posts(props) {
	console.log(props);

	return(
		<div className = "container">
			<div className="row row-content">
				<div className="col-md-10">
					<PostList posts={props.posts}
							isLoading={props.isLoading} 
							errMess={props.ErrMess}/>
				</div>
			</div>
		</div>
	);
}

export default Posts;
