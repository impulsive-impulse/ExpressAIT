import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import React,{Component} from 'react';
import { connect } from 'react-redux';

import { authSignUp, authSignIn } from '../redux/ActionCreators';


const mapDispatchToProps = dispatch => ({
    onAuthSignUp: ( email, password, firstName, lastName) => dispatch(authSignUp( email, password, firstName, lastName)),
    onAuthSignIn: (email, password) => dispatch(authSignIn(email, password))
});

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          isSignUp : true
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleLogin(event) {
        this.toggleModal();
        event.preventDefault();
        //alert("Username: " + this.username.value + " Password: " + this.password.value);
        if(!this.state.isSignup)
            this.props.onAuthSignUp( this.username.value, this.password.value, this.firstName.value, this.lastName.value);
        else 
            this.props.onAuthSignIn(this.username.value, this.password.value);
        }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        } );
    }

    render() {
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='./logo192.png' height="30" width="41" alt='ExpressAIT' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/new'><span className="fa fa-pencil fa-lg"></span> NewPost </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Authenticate</Button>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.isSignup ? 'LogIn' : 'SignUp'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>

                            {!this.state.isSignup?<FormGroup>
                                <Label htmlFor="lastName">LastName</Label>
                                <Input type="text" id="lastName" name="lastName"
                                    innerRef={(input) => this.lastName = input} />
                            </FormGroup> : null}
                            {!this.state.isSignup?<FormGroup>
                                <Label htmlFor="firstName">FirstName</Label>
                                <Input type="text" id="firstName" name="firstName"
                                    innerRef={(input) => this.firstName = input} />
                            </FormGroup>:null}
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">{this.state.isSignup ? 'LogIn' : 'SignUp'}</Button>
                            <Label onClick={this.switchAuthModeHandler}> <i><b><sub>Switch to {!this.state.isSignup ? 'LogIn' : 'SignUp'} ? </sub></b></i></Label>
                        </Form>
                    </ModalBody>
                </Modal>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Express AIT</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));
