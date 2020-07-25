import React from 'react';


function FullPost (props){
	//console.log(props);
		return(
				<>
					<div className="container">
						<div className="row">
							<img src={props.post.image} height="100" width="100" />
						</div>
						<div className="row">
							<h3><strong>{props.post.title}</strong></h3>
						</div>
						<div className="row offset-col-md-4">
							<h4>--{props.post.author}</h4>
						</div>
						<div className="row row-content">
							<p>{props.post.content}</p>
						</div>
					</div>
				</>
			);
}

export default FullPost;