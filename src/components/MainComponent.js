import React, { Component} from 'react';
import Header from './HeaderComponent';
import Posts from '../shared/posts'
import Home from './PostsComponent';

class Main extends Component {

	render(){
		return(
			<>
				<Header/>
				<Home posts={Posts} />
			</>
			);
	}
}

export default Main;