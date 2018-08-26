import React from 'react';
import {connect} from 'react-redux';
import {createReply} from '../../redux/actions/poem';

import './createReply.css';

export class CreateReply extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
	    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    event.preventDefault();

    new Promise((resolve, reject) => {
     	resolve(this.props
     		.dispatch(createReply(this.props.poem_id, this.props.index, 
     			this.props.comment_id, this.state.value)));
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
			<form autoComplete="off" onSubmit={this.handleSubmit} className="createReply">
				<label>Comment</label>
				<textarea className="comment-box" type="text" value={this.state.value} onChange={this.handleChange} />
				<button className="common-button" type="submit">Reply</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CreateReply);