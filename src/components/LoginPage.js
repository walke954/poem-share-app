import React from 'react';
import LoginForm from './LoginForm.js';
import {Redirect} from 'react-router-dom';

export default class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			processed: false
		}

		this.redirectToHome = this.redirectToHome.bind(this);
	}

	redirectToHome(){
		this.setState({processed: true});
	}

	render(){
		if(this.state.processed){
			return <Redirect to="/home/" />;
		}

		return (
			<div>
				<LoginForm redirectToHome={this.redirectToHome} />
			</div>
		);
	}
}