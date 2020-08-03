import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { addNewPost } from '../redux/ActionCreators';
import {Loading} from './LoadingComponent';

class NewPost extends Component {
  
  addPostHandler = (event) => {
    const data ={
      title: event.title,
      author: this.props.author,
      content: event.content,
      userId: this.props.userId,
      image:''
    }

    this.props.addNewPost(data);
  };
  render() {

    if(this.props.newPost.isLoading)
    {
      return (<Loading/>);
    }


    let redirectElement = null;
    if (this.props.newPost.redirect) {
      redirectElement = <Redirect to="/" />;
    }
    return (
      <>
        {redirectElement}
        <div className="container">
          <LocalForm onSubmit={(values) => this.addPostHandler(values) }>
            <Row className="form-group">
                <Label htmlFor="title" md={2}><strong>Post Title</strong></Label>
                <Col md={10}>
                    <Control.text model=".title" id="title" name="title"
                        placeholder="Catchy title here bitch"
                        className="form-control"
                         />
                </Col>
            </Row>
          
            <Row className="form-group">
                <Label htmlFor="content" md={2}><strong>Post Description</strong></Label>
                <Col md={10}>
                    <Control.textarea model=".content" id="content" name="content"
                        rows="12" placeholder="You saw shit? Time to step on it"
                        className="form-control" />
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
    newPost: state.newPost,
    author: state.auth.displayName,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   addNewPost: (data) => {dispatch(addNewPost(data))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
