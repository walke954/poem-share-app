import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Heading from './Heading.js';
import Home from './Home.js';
import LoginPage from './LoginPage.js';
import About from './About.js';
import SignupPage from './SignupPage.js';
import PoemDisplayPage from './poemDisplayPage/PoemDisplayPage.js';
import Settings from './Settings.js';
import Search from './Search.js';

import './app.css';

export class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			header: {
				title: 'Goodbye',
				pages: ['Home', 'Settings'],
			},
			user_data: null,
			error: null,
			loading: true
		}
	}

	render(){
		let heading = null;
		if(this.props.loggedIn){
			heading = <Heading />;
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
						<Route exact path="/settings/" component={Settings} />
						<Route exact path="/poem/:poemId" component={PoemDisplayPage} />
						<Route exact path="/search/" component={Search} />
					</main>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);