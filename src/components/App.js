import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Heading from './Heading.js';
import Home from './Home.js';
import LoginPage from './LoginPage.js';
import About from './About.js';
import SignupPage from './SignupPage.js';
import PoemDisplayPage from './poemDisplayPage/PoemDisplayPage.js';
import Profile from './Profile.js';
import Search from './Search.js';
import {loadAuthToken, clearAuthToken} from '../redux/local-storage';
import {Redirect} from 'react-router-dom';
import {API_BASE_URL} from '../config';
import {clearAuth} from '../redux/actions/auth.js';

import './app.css';
import logo from '../logo.png';

export class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			userInfo: null,
			exists: true
		}

		this.getUserInfo = this.getUserInfo.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		this.update = this.update.bind(this);
	}

	deleteAccount(){
		const authToken = loadAuthToken();
		return fetch(`${API_BASE_URL}/user/${this.props.user.id}`, {
	        method: 'DELETE',
	        mode: 'cors',
	        headers: {
	           'Content-Type': 'application/json',
	           'Authorization': `Bearer ${authToken}`
	        }
	    })
            .then(() => {
            	this.props.dispatch(clearAuth());
            	clearAuthToken();
            })
            .catch(err => {
            	console.error(err);
            });
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

	update(){
		this.setState({
			loading: true,
			userInfo: null,
			exists: true
		});
	}

	render(){
		let heading = null;

		// only display the 'Heading' component if the user is logged in, otherwise they will just see the logo image.
		if(this.props.loggedIn){
			heading = <Heading />;
		}
		else{
			heading = 
				(<header className="heading">
					<img className="logo" src={logo} alt="Cloud Poetry website logo" />
				</header>);
		}

		return (
			<Router>
				<div className="app">
					{heading}
					<main>
						<Route exact path="/" component={LoginPage} />
						<Route exact path="/signup/" component={SignupPage} />
						<Route exact path="/about/" component={About} />
						<Route exact path="/home/" component={Home} />
						<Route 
							exact path="/profile/:username" 
							render={(props) => 
								<Profile {...props} 
									loading={this.state.loading}
									userInfo={this.state.userInfo}
									exists={this.state.exists}
									deleteAccount={this.deleteAccount} 
									getUserInfo={this.getUserInfo}
									update={this.update}
								/>} 
						/>
						<Route exact path="/poem/:poemId" component={PoemDisplayPage} />
						<Route exact path="/search/" component={Search} />
					</main>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	user: state.auth.currentUser
});

export default connect(mapStateToProps)(App);