import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {createPoem} from '../../redux/actions/poem';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import {required, nonEmpty, isTrimmed} from '../../validators';

export class CreatePoemForm extends React.Component{
	onSubmit(values){
		const {title, content} = values;
		return this.props
			.dispatch(createPoem(title, content))
			.then(() => {
				this.props.redirectToHome();
			});
	}

	render(){
		return (
			<form autoComplete="off" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="title">Title</label>
				<Field 
					name="title" 
					id="title" 
					type="text" 
					component={Input} 
					validate={[required, nonEmpty, isTrimmed]} 
				/>
				<label htmlFor="content">Content</label>
				<Field 
					name="content" 
					id="content" 
					type="text" 
					component={TextArea} 
					validate={[required, nonEmpty]}
				/>
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Create</button>
			</form>
		);
	}
}

export default reduxForm({form: 'create'})(CreatePoemForm);