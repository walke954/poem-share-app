import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../../redux/actions/auth';
import Input from '../inputs/Input';
import {required, nonEmpty} from '../../validators';

export class LoginForm extends React.Component{
	onSubmit(values){
		const {username, password} = values;
		return this.props
			.dispatch(login(username, password))
			.then(() => {
				this.props.history.push('/home/');
			});
	}

	render(){
		return (
			<form autoComplete="off" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Login</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', Object.keys(errors)[0])),
})(LoginForm);