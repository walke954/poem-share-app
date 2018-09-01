import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';
import {loadAuthToken, clearAuthToken} from '../redux/local-storage';
import RequireLogin from './RequireLogin.js';
import {clearAuth} from '../redux/actions/auth.js';
import {Redirect} from 'react-router-dom';
import PoemList from './PoemList.js';

import './profile.css';

export class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isUsers: this.props.match.params.username === this.props.user.username,
		}

		this.update = this.update.bind(this);
	}

	update(){
		this.setState({isUsers: this.props.match.params.username === this.props.user.username});
	}

	componentDidMount(){
		const query = {
			username: this.props.match.params.username
		}
		this.props.getUserInfo(query);
	}

	componentDidUpdate(prevProps){
		if(prevProps.match.params.username !== this.props.match.params.username){
			const query = {
				username: this.props.match.params.username
			}
			this.update();
			this.props.update();
			this.props.getUserInfo(query);
		}
	}

	render(){
		if(!this.props.exists){
			return <Redirect to="/home/" />;
		}

		if(this.props.loading){
			return (
				<div className="profile">
					<p>Loading Profile...</p>
				</div>
			);
		}

		const info = (
			<div className="user-info">
				<h2>{this.props.userInfo.user.displayName} @
				<span style={{color:'gray'}}>
					{this.props.userInfo.user.username}
				</span></h2>
			</div>
		);

		if(this.state.isUsers){
			return (
				<div className="profile">
					{info}
					<button 
						className="warning-button" 
						onClick={() => this.props.deleteAccount(this.props)}>
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

export default RequireLogin()(connect(mapStateToProps)(Profile));