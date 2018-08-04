import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../redux/actions/user';
import Input from '../inputs/Input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class SignupForm extends React.Component{
	onSubmit(values){
		const {username, password, displayName} = values;
		const user = {username, password, displayName};
		return this.props
			.dispatch(registerUser(user))
			.then(() => {
				this.props.history.push('/');
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
					validate={[required, nonEmpty, isTrimmed]} 
				/>
				<label htmlFor="displayName">Display Name</label>
				<Field name="displayName" id="displayName" type="text" component={Input} />
				<label htmlFor="password">Password</label>
				<Field 
					name="password" 
					id="password" 
					type="password" 
					component={Input} 
					validate={[required, passwordLength, isTrimmed]}
				/>
				<label htmlFor="passwordConfirm">Retype Password</label>
				<Field 
					name="passwordConfirm" 
					id="passwordConfirm" 
					type="password" 
					component={Input} 
					validate={[required, nonEmpty, matchesPassword]}
				 />
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Register</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'signup',
	onSubmitFail: (errors, dispatch) => dispatch(focus('signup', Object.keys(errors)[0])),
})(SignupForm);