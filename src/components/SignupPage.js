import React from 'react';
import SignupForm from './SignupForm.js';
import {Redirect} from 'react-router-dom';

export default class SignupPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			processed: false
		}

		this.redirectToLogin = this.redirectToLogin.bind(this);
	}

	redirectToLogin(){
		this.setState({processed: true});
	}

	render(){
		if(this.state.processed){
			return <Redirect to="/" />;
		}

		return (
			<div>
				<SignupForm redirectToLogin={this.redirectToLogin} />
			</div>
		);
	}
}