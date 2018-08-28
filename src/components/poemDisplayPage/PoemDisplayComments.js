import React from 'react';
import {connect} from 'react-redux';
import CommentCreate from './CommentCreate.js';
import CreateReply from './CreateReply.js';
import {Link} from 'react-router-dom';

import './poemDisplayComments.css';

export class PoemDisplayComments extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			comments_display: false,
			willComment: false,
			commentId: ''
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
			// map existing comments
			comments = this.props.poem.comments.map((comment, index) => {
				// map replies
				const replies = this.props.poem.replies
					.filter(reply => reply.comment_id === comment.id)
					.sort((a,b) => a.index - b.index)
					.map((reply, index) => {
						const authorLink = `/profile/${reply.username}`;
						return (
							<div className="reply" key={reply.id}>
								<p>{reply.content}</p>
								<p className="author">
									{reply.displayName} @
									<Link className="authLink" to={authorLink}>
										{reply.username}
									</Link>
								</p>
								<p className="author">{reply.date}</p>
							</div>
						);
					});

				// create a reply creation box if user has selected it
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
				// add the create reply selection
				else if(this.props.auth.currentUser !== null){
					replies.push(
						<p className="clickable createReply" onClick={() => this.setState({commentId: comment.id})}
						key={comment.id}>Reply</p>)
				}

				// return comment with replies.
				const authorLink = `/profile/${comment.username}`;
				return (
					<div className="comment" key={index}>
						<p>{comment.content}</p>
						<p className="author">
							{comment.displayName} @
								<Link className="authLink" to={authorLink}>
									{comment.username}
								</Link>
							</p>
						<p className="author">{comment.date}</p>
						{replies}
					</div>
				);
			});

			// if the user will comment, create a comment creation box, otherwise give them the option to comment.
			if(this.state.willComment){
				comments.push(<CommentCreate 
					poem_id={this.props.poem.id} 
					key={this.props.poem.id} 
					update={this.update} 
				/>);
			}
			else if(this.props.auth.currentUser !== null){
				comments.push(
					<p className="clickable createComment" onClick={() => this.setState({willComment: true})}
						key={this.props.poem.id}>Comment</p>
				);
			}
		}
		else{
			comments = null;
		}

		let amount = `(${this.props.poem.comments.length})`;

		if(this.state.comments_display){
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