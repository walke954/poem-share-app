import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuthToken} from '../redux/local-storage.js';
import {clearAuth} from '../redux/actions/auth.js';

export class Heading extends React.Component{
	logout(){
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render(){
		return (
			<header>
				<h1>Poem Share</h1>
				<ul>
					<li><Link to="/home/">Home</Link></li>
					<li><Link to="/search/">Search</Link></li>
					<li><Link to="/settings/">Settings</Link></li>
					<li onClick={() => this.logout()}>Logout</li>
				</ul>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Heading);