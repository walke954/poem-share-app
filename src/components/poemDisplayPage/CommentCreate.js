import React from 'react';
import {Field, reduxForm} from 'redux-form';
import TextArea from '../inputs/TextArea';
import {nonEmpty, required} from '../../validators';
import {createComment} from '../../redux/actions/poem';

export class CommentCreate extends React.Component{
	onSubmit(values){
		const {content} = values;
		return this.props
			.dispatch(createComment(this.props.poem_id, content))
			.then(() => this.props.update());
	}

	render(){
		return (
			<form autoComplete="off" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="content">Comment</label>
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

export default reduxForm({form: 'commentCreate'})(CommentCreate);