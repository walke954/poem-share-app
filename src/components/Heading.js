import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {clearAuthToken} from '../redux/local-storage.js';
import {clearAuth} from '../redux/actions/auth.js';

import './heading.css';
import logo from '../logo.png';

export class Heading extends React.Component{
	logout(){
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render(){
		return (
			<header className="heading">
				<img className="logo" src={logo} alt="Cloud Poetry website logo" />
				<ul className="link-list">
					<li><NavLink className="link" to="/home/">Home</NavLink></li>
					<li><NavLink className="link" to="/search/">Search</NavLink></li>
					<li><NavLink className="link" to="/profile/">Profile</NavLink></li>
					<li className="logout" onClick={() => this.logout()}>Logout</li>
				</ul>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Heading);