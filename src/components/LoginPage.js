import React from 'react';
import LoginForm from './forms/LoginForm.js';

export default function LoginPage(props){
	return (
		<div>
			<LoginForm history={props.history} />
		</div>
	);
}