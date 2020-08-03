import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

class CommentForm extends Component {

    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        const data ={
        	postId :this.props.postId,
        	author :this.props.currentUserName,
        	rating : values.rating,
        	comment : values.comment,
            userId : this.props.currentUserId
        }
        
        this.props.addComment(data);
    }

    render() {

        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment"
                                    rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
           </Modal>
        </div>
        );
    }

}


function RenderComments (comments, postId){
	

	if(comments!=null)
	{
		return(
			<>
				<div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.comments.map((comment) => {
                            return (
                                <div key={comment._id}>
                                    <li>
                                    <p><strong>{comment.comment}</strong><br/>
                                    <strong>{comment.rating} stars</strong></p>
                                    <p>-- {comment.author}, {comment.date}</p>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </div>
			</>
		)
	}
	return null;	
}

function FullPost (props){

        let commentForm = null;
        if(props.isAuthenticated)
            commentForm = (<CommentForm addComment={props.addComment}
                                postId={props.postId}
                                currentUserId={props.currentUserId}
                                currentUserName={props.currentUserName}
                            />);

        const history= useHistory();
        const deletePostFun = () => {
            props.deletePost(props.postId);
            history.push("/");
        }

        let authFeature=null;
        if(props.post.userId === props.currentUserId)
            authFeature = (<>
                            <Link to={"/home/"+props.postId+"/edit"}><Button color="warning"> EDIT </Button></Link>
                            <Button onClick={deletePostFun} color="danger"> DELETE </Button>
                        </>
                    );

		return(
				<>
					<div className="container">
						<div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.post.title}</BreadcrumbItem>
                        </Breadcrumb>
                            <hr />
                        </div>
						<div className="row">
							<img src={(props.post.image)} height="100" width="100" alt={props.post.title} />
						</div>
						<div className="row">
							<h3><strong>{props.post.title}</strong></h3>
						</div>
						<div className="row">
							<h4>--{props.post.author}</h4>
						</div>
                        <div className="row">
                            <h4>{authFeature}</h4>
                        </div>
						<div className="row">
							<p>{props.post.content}</p>
						</div>
						<div className="row">
							<RenderComments comments={props.comments} postId={props.postId} />
						</div>
						<div className="row row-content">
							{commentForm}
						</div>
					</div>
				</>
			);
}

export default FullPost;