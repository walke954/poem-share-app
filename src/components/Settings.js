import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';
import {loadAuthToken, clearAuthToken} from '../redux/local-storage';
import RequireLogin from './RequireLogin.js';
import {clearAuth} from '../redux/actions/auth.js';

export class Settings extends React.Component{
	constructor(props){
		super(props);

		this.deleteAccount = this.deleteAccount.bind();
	}

	deleteAccount(props){
		const authToken = loadAuthToken();
		return fetch(`${API_BASE_URL}/user/${props.user.id}`, {
	        method: 'DELETE',
	        mode: 'cors',
	        headers: {
	           'Content-Type': 'application/json',
	           'Authorization': `Bearer ${authToken}`
	        }
	    })
            .then(() => {
            	props.dispatch(clearAuth());
            	clearAuthToken();
            })
            .then(() => {
            	props.history.push('/');
            })
            .catch(err => {
            	console.error(err);
            });
	}

	render(){
		return (
			<div>
				<button onClick={() => this.deleteAccount(this.props)}>Delete Account</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.currentUser
});

export default RequireLogin()(connect(mapStateToProps)(Settings));