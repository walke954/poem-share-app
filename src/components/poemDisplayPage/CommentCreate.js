import React from 'react';
import {connect} from 'react-redux';
import {createComment} from '../../redux/actions/poem';

import './commentCreate.css';

export class CommentCreate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	// onSubmit(values){
	// 	const {content} = values;
	// 	return this.props
	// 		.dispatch(createComment(this.props.poem_id, content))
	// 		.then(() => this.props.update());
	// }

	handleChange(event) {
	    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    event.preventDefault();

    new Promise((resolve, reject) => {
     	resolve(this.props.dispatch(createComment(this.props.poem_id, this.state.value)));
    })
      	.then(() => {
	        this.props.update();
	    })
	    .catch(err => {
	        console.error(err);
	    });
  }

	render(){
		return (
			<form autoComplete="off" onSubmit={this.handleSubmit} className="commentCreate">
				<label>Comment</label>
				<textarea className="comment-box" type="text" value={this.state.value} onChange={this.handleChange} />
				<button className="common-button" type="submit">Comment</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CommentCreate);