import React from 'react';


function RenderComments(comments){
	 if (comments !== null && Array.isArray(comments.comments))
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                            {comments.comments.map((comment) => {
                                return (
                                    <div key={comment.id}>
                                        <li>
                                        <p><strong>{comment.comment}</strong></p>
                                        <p><strong>{comment.rating} stars </strong></p>
                                        <p>-- {comment.author} , {comment.date}</p>
                                        </li>
                                    </div>
                                );
                            })}
                    </ul>
                </div>
            );
        
        return(
            <div></div>
        );
}

function FullPost (props){

	console.log(props);
		return(
				<>
					<div className="container">
						<div className="row">
							<img src={(props.post.image)} height="100" width="100" />
						</div>
						<div className="row">
							<h3><strong>{props.post.title}</strong></h3>
						</div>
						<div className="row">
							<h4>--{props.post.author}</h4>
						</div>
						<div className="row">
							<p>{props.post.content}</p>
						</div>
						<div className="row ">
							<RenderComments comments={props.comments}/>
						</div>
					</div>
				</>
			);
}

export default FullPost;