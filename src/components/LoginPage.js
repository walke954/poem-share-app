import React from 'react';
import LoginForm from './forms/LoginForm.js';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

export function LoginPage(props){
	if(props.loggedIn){
		return <Redirect to="/home/" />;
	}

	return (
		<div>
			<LoginForm history={props.history} />
			<p><Link to="/signup/">Signup</Link></p>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);