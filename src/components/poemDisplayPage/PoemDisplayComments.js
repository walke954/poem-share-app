import React from 'react';
import {connect} from 'react-redux';
import CommentCreate from './CommentCreate.js';
import CreateReply from './CreateReply.js';

import './poemDisplayComments.css';

export class PoemDisplayComments extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			comments_display: false,
			willComment: false,
			commentId: '',
		}
		this.update = this.update.bind(this);
	}

	update(){
		this.setState({willComment: false});
		this.setState({commentId: ''});
	}

	render(){
		let comments;

		if(this.state.comments_display){
			comments = this.props.poem.comments.map((comment, index) => {
				const replies = this.props.poem.replies
					.filter(reply => reply.comment_id === comment.id)
					.sort((a,b) => a.index - b.index)
					.map((reply, index) => {
						return (
							<div className="reply" key={reply.id}>
								<p>{reply.content}</p>
								<p>{reply.displayName} <span className="gray-text">@{reply.username}</span></p>
								<p>{reply.date}</p>
							</div>
						);
					});

				if(this.state.commentId === comment.id){
					replies.push(
						<CreateReply 
							poem_id={this.props.poem.id} 
							index={index}
							comment_id={comment.id} 
							update={this.update} 
							key={comment.id}
						/>
					);
				}
				else if(this.props.auth.currentUser !== null){
					replies.push(
						<p className="clickable" onClick={() => this.setState({commentId: comment.id})}
						key={comment.id}>Reply</p>)
				}

				return (
					<div className="comment" key={index}>
						<p>{comment.content}</p>
						<p>{comment.displayName} <span className="gray-text">@{comment.username}</span></p>
						<p>{comment.date}</p>
						{replies}
					</div>
				);
			});

			if(this.state.willComment){
				comments.push(<CommentCreate 
					poem_id={this.props.poem.id} 
					key={this.props.poem.id} 
					update={this.update} 
				/>);
			}
			else if(this.props.auth.currentUser !== null){
				comments.push(
					<p className="clickable" onClick={() => this.setState({willComment: true})}
						key={this.props.poem.id}>Comment</p>
				);
			}
		}
		else{
			comments = null;
		}

		let amount = `(${this.props.poem.comments.length})`;

		if(this.props.display){
			amount = '';
		}

		return (
			<div className="poemDisplayComments">
				<h3 className="display-comments" onClick={() => this.setState({comments_display: !this.state.comments_display})}>Comments{amount}</h3>
				{comments}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	poem: state.poem,
	auth: state.auth
});

export default connect(mapStateToProps)(PoemDisplayComments);