import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../../redux/actions/auth';
import Input from '../inputs/Input';
import {required, nonEmpty} from '../../validators';

import './loginForm.css';

export class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: false
		}

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values){
		const {username, password} = values;
		return this.props
			.dispatch(login(username, password))
			.then(() => {
				this.props.history.push('/home/');
			})
	}

	render(){
		let loading;
		if(this.state.loading){
			loading = <p className="example">Loading example...</p>
		}

		let warning;
		if(this.props.error){
			warning = <p className="form-warning">*{this.props.error}</p>;
		}
		
		return (
			<form className="loginForm" autoComplete="off" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h2 className="form-title">Login</h2>
				<label htmlFor="username">Username</label>
				<Field 
					name="username" 
					id="username" 
					type="text" 
					component={Input} 
					validate={[required, nonEmpty]} 
					value=""
				/>
				<label htmlFor="password">Password</label>
				<Field 
					name="password" 
					id="password" 
					type="password" 
					component={Input} 
					validate={[required, nonEmpty]}
					value=""
				/>
				{warning}
				<p className="example">Click <span id="example-link" onClick={() => {
					this.setState({loading: true});
					const values = {
						username: 'example',
						password: 'sdfsdfsdfj'
					}
					this.onSubmit(values);
				}}>here</span> for a quick example</p>
				{loading}
				<button 
					className="common-button"
					type="submit" 
					disabled={this.props.pristine || this.props.submitting}
				>Login</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', Object.keys(errors)[0])),
})(LoginForm);