import React from 'react';
import SignupForm from './forms/SignupForm.js';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

export function SignupPage(props){
	if(props.loggedIn){
		return <Redirect to="/home/" />;
	}

	return (
		<div>
			<SignupForm history={props.history} />
			<p><Link to="/">Back to login</Link></p>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignupPage);