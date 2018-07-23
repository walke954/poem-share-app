import React from 'react';
import CreatePoemForm from './CreatePoemForm.js';
import {Redirect} from 'react-router-dom';

export default class CreatePoem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			processed: false
		}

		this.redirectToHome = this.redirectToHome.bind(this);
	}

	redirectToHome(){
		this.setState({processed: true});
	}

	render(){
		if(this.state.processed){
			return <Redirect to="/home/" />;
		}

		return (
			<div>
				<CreatePoemForm redirectToHome={this.redirectToHome} />
			</div>
		);
	}
}