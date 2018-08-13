import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {editPoem} from '../../redux/actions/poem';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import {required, nonEmpty, isTrimmed} from '../../validators';
import {connect} from 'react-redux';

export class PoemEdit extends React.Component{
	onSubmit(values){
		const {title, content} = values;
		return this.props
			.dispatch(editPoem(title, content, this.props.id))
			.then(() => {
				this.props.toggleEdit();
			});
	}

	render(){
		return (
			<form 
				autoComplete="off" 
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} 
			>
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
				<button type="submit" disabled={this.props.submitting}>Update</button>
				<button type="button" onClick={() => this.props.toggleEdit()}>Cancel</button>
			</form>
		);
	}
}

const initializeForm = state => ({
	initialValues: {
		title: state.poem.title,
		content: state.poem.content
	}
});

export default connect(initializeForm)(reduxForm({form: 'create'})(PoemEdit));