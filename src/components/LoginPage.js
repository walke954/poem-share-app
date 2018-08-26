import React from 'react';
import LoginForm from './forms/LoginForm.js';
import About from './About.js';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './loginPage.css';

export function LoginPage(props){
	if(props.loggedIn){
		return <Redirect to="/home/" />;
	}

	return (
		<div className="loginPage">
			<About />
			<LoginForm history={props.history} />
			<p id="to-signup">Not a user? <Link to="/signup/">Register</Link> now!</p>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);