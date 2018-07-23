import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home.js';
import LoginPage from './LoginPage.js';
import About from './About.js';
import SignupPage from './SignupPage.js';
import CreatePoem from './CreatePoem.js';

import './app.css';

export default class App extends React.Component{
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

	componentDidMount(){

	}

	render(){
		return (
			<Router>
				<div className="app">
					<header>
						<h1>Poem Share</h1>
						<ul>
							<li><Link to="/about/">About</Link></li>
							<li><Link to="/">Login</Link></li>
							<li><Link to="/signup/">Signup</Link></li>
							<li><Link to="/home/">Home</Link></li>
							<li><Link to="/create/">Create Poem</Link></li>
						</ul>
					</header>
					<main>
						<Route exact path="/" component={LoginPage} />
						<Route exact path="/signup/" component={SignupPage} />
						<Route exact path="/about/" component={About} />
						<Route exact path="/home/" component={Home} />
						<Route exact path="/create/" component={CreatePoem} />
					</main>
				</div>
			</Router>
		);
	}
}