import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderComments(comments,addComment,postId){
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
                    <CommentForm postId={postId} addComment={addComment} />
                </div>
            );
        
        return(
            <div></div>
        );
}

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
        this.props.addComment(this.props.postId, values.rating, values.author, values.comment);
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
                        <Label htmlFor="author">Author</Label>
                        <Control.textarea model=".author" id="author"
                                    rows="1" className="form-control" />
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

function FullPost (props){
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
							<RenderComments comments={props.comments}
								addComment={props.addComment}
								postId={props.postId} />
						</div>
					</div>
				</>
			);
}

export default FullPost;