import React from 'react';
import SignupForm from './forms/SignupForm.js';

export default function SignupPage(props){
	return (
		<div>
			<SignupForm history={props.history} />
		</div>
	);
}