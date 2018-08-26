import React from 'react';
import PoemList from './PoemList.js';
import CreatePoemForm from './forms/CreatePoemForm.js';
import RequireLogin from './RequireLogin.js';
import {connect} from 'react-redux';

import './home.css';

export class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			createPoem: false // when true, a poem creation block is rendered.
		}

		this.toggleCreatePoem = this.toggleCreatePoem.bind(this);
	}

	toggleCreatePoem(){
		this.setState({createPoem: !this.state.createPoem});
	}

	render(){
		let createPoemBlock = <div className="createPoemBlock"></div>;
		let createPoemBlockButton = 
			<button className="create-poem-button common-button" onClick={() => this.toggleCreatePoem()}>
				Create A Poem
			</button>;

		if(this.state.createPoem){
			createPoemBlock = (
				<div className="createPoemBlock">
					<h3>Create A New Poem</h3>
					<CreatePoemForm history={this.props.history} />
				</div>
			);
			createPoemBlockButton = null;
		}

		return (
			<div className='home'>
				{createPoemBlockButton}
				{createPoemBlock}
				<div className="poemList-wrapper">
					<h3>User Poems</h3>
					<PoemList username={this.props.user.username} history={this.props.history} />
				</div>
				<div className="poemList-wrapper">
					<h3>Recently Uploaded</h3>
					<PoemList history={this.props.history} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default RequireLogin()(connect(mapStateToProps)(Home));