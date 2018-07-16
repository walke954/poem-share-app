import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Header from './Header.js';
// import Home from './Home.js';
import './app.css';
import {API_BASE_URL} from '../config.js';

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
		this.userLog = this.userLog.bind(this);
	}

	componentDidMount(){
		this.userLog();
	}

	userLog(){
		fetch(`${API_BASE_URL}/user/log`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('p8s4a9Token')}`
			}
		})
			.then(res => {
				if(!res.ok){
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					user_data: data,
					loading: false
				})
			})
			.catch(err => {
				this.setState({
					error: 'user could not be found',
					loading: false
				})
			})
	}

	render(){
		return (
			<div>
				<div id="header-container">
					<Header pages={this.state.header.pages} title={this.state.header.title} />
				</div>
				<div id="page-container">
					
				</div>
			</div>
		);
	}
}