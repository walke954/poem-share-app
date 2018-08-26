import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';
import {loadAuthToken, clearAuthToken} from '../redux/local-storage';
import RequireLogin from './RequireLogin.js';
import {clearAuth} from '../redux/actions/auth.js';
import {Redirect} from 'react-router-dom';
import PoemList from './PoemList.js';

import './profile.css';

export class Settings extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			isUsers: this.props.match.params.username === this.props.user.username,
			userInfo: null,
			exists: true
		}

		this.deleteAccount = this.deleteAccount.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this)
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

	update(){
		this.setState({
			loading: true,
			isUsers: this.props.match.params.username === this.props.user.username,
			userInfo: null,
			exists: true
		});
	}

	componentDidMount(){
		const query = {
			username: this.props.match.params.username
		}
		this.getUserInfo(query);
	}

	componentDidUpdate(prevProps){
		if(prevProps.match.params.username !== this.props.match.params.username){
			const query = {
				username: this.props.match.params.username
			}
			this.update();
			this.getUserInfo(query);
		}
	}

	// calls to the API to get user info
	getUserInfo(query){
		const queryString = `username=${query.username}`;
		return fetch(`${API_BASE_URL}/user/user/?${queryString}`, {
	        method: 'GET',
	        mode: 'cors',
	        headers: {
	           'Content-Type': 'application/json'
	        }
	    })
		    .then( res => {
		    	if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
		    .then(user => {
		    	this.setState({userInfo: user});
		    	this.setState({loading: false});
		    })
		    .catch(err => {
		    	this.setState({exists: false});
		        console.error(err);
		    });
	}

	render(){
		if(!this.state.exists){
			return <Redirect to="/home/" />;
		}

		if(this.state.loading){
			return (
				<div className="profile">
					<p>Loading Profile...</p>
				</div>
			);
		}

		const info = (
			<div className="user-info">
				<h2>{this.state.userInfo.user.displayName} @
				<span style={{color:'gray'}}>
					{this.state.userInfo.user.username}
				</span></h2>
			</div>
		);

		if(this.state.isUsers){
			return (
				<div className="profile">
					{info}
					<button 
						className="warning-button" 
						onClick={() => this.deleteAccount(this.props)}>
							Delete Account
					</button>
					<p className="form-warning">*Deleting an account is permenant and cannot be recovered.</p>
					<h3>Liked Poems</h3>
					<PoemList username={this.props.match.params.username} likes="true" history={this.props.history} />
				</div>
			);
		}
		else{
			return (
				<div className="profile">
					{info}
					<h3>User Poems</h3>
					<PoemList username={this.props.match.params.username} history={this.props.history} />
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	user: state.auth.currentUser
});

export default RequireLogin()(connect(mapStateToProps)(Settings));