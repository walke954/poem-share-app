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

import './app.css';
import logo from '../logo.png';

export function App(props){
	let heading = null;

	// only display the 'Heading' component if the user is logged in, otherwise they will just see the logo image.
	if(props.loggedIn){
		heading = <Heading />;
	}
	else{
		heading = <img className="logo" src={logo} alt="Cloud Poetry website logo" />;
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
					<Route exact path="/profile/" component={Profile} />
					<Route exact path="/poem/:poemId" component={PoemDisplayPage} />
					<Route exact path="/search/" component={Search} />
				</main>
			</div>
		</Router>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);