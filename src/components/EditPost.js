import React, {Component} from 'react';
import { connect } from "react-redux";
import { Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import {editPost, editPostGetData, updatePostTitle, updatePostContent} from '../redux/ActionCreators';

class EditPost extends Component{

	componentDidMount(){
		this.props.getData(this.props.match.params.postId)
	}

	editPostHandler = (event) => {
		    this.props.updatePost(this.props.title, this.props.author, this.props.content, this.props.match.params.postId);
		};

	onChangeHandlerTitle = (event) => {
	    this.props.updateTitleHandler(event.target.value);  
	  };

  	onChangeHandlerContent = (event) => {
	    this.props.updateContentHandler(event.target.value);
	  };

	render(){	
		return(
			<>
			<div className="container">
		          <LocalForm onSubmit={(values) => this.editPostHandler(values) }>
		            <Row className="form-group">
		                <Label htmlFor="title" md={2}><strong>Post Title</strong></Label>
		                <Col md={10}>
		                    <Control.text model=".title" id="title" name="title"
		                        placeholder="Catchy title here bitch"
		                        className="form-control"
		                        value={this.props.title}
		                        onChange={this.onChangeHandlerTitle}
		                         />
		                </Col>
		            </Row>
		            <Row className="form-group">
		                <Label htmlFor="author" md={2}><strong>Author</strong></Label>
		                <Col md={10}>
		                    <Control.text model=".author" id="author" name="author"
		                        placeholder="Author"
		                        className="form-control"
		                        value={this.props.author}
		                         />
		                </Col>
		            </Row>
		          
		            <Row className="form-group">
		                <Label htmlFor="content" md={2}><strong>Post Description</strong></Label>
		                <Col md={10}>
		                    <Control.textarea model=".content" id="content" name="content"
		                        rows="12" placeholder="You saw shit? Time to step on it"
		                        value={this.props.content}
		                        className="form-control" 
		                        onChange={this.onChangeHandlerContent}/>
		                </Col>
		            </Row>
		            <Row className="form-group">
		                <Col md={{size:10, offset: 2}}>
		                    <Button type="submit" color="primary">
		                    Send Post
		                    </Button>
		                </Col>
		            </Row>
		        </LocalForm>
		    </div>
			</>
		);
	}
} 

const mapStateToProps = (state) => {
	return {
		title: state.editPost.title,
		author: state.editPost.author,
		content: state.editPost.content
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		updateTitleHandler: (newTitle) => dispatch(updatePostTitle(newTitle)),
    	updateContentHandler: (newContent) => dispatch(updatePostContent(newContent)),
		updatePost: (title, author, content, id) => dispatch(editPost(title, author, content, id)),
		getData: (id) => dispatch(editPostGetData(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);