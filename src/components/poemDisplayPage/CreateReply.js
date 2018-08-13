import React from 'react';
import {Field, reduxForm} from 'redux-form';
import TextArea from '../inputs/TextArea';
import {createReply} from '../../redux/actions/poem';

export class CreateReply extends React.Component{
	onSubmit(values){
		const {content} = values;
		return this.props
			.dispatch(createReply(this.props.poem_id, this.props.index, this.props.comment_id, content))
			.then(() => this.props.update());
	}

	render(){
		return (
			<form autoComplete="off" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="content">Reply</label>
				<Field 
					name="content" 
					id="content" 
					type="text" 
					component={TextArea} 
				/>
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Reply</button>
			</form>
		);
	}
}

export default reduxForm({form: 'createReply'})(CreateReply);