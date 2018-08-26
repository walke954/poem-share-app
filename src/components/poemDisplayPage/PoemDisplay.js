import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './poemDisplay.css';

export function PoemDisplay(props){
	let like = props.user.likes.findIndex(like => like === props.poem.id) === -1 ? 'Like' : 'Unlike';
	
	let toolBar;
	// users who are looking at their own poem should have a toolbar that allows them to edit and delete their own poem, while users who are viewing poems that aren't their own have a toolbar that only allows them to like/unlike poems.
	if(props.auth.currentUser !== null && props.poem.username === props.auth.currentUser.username){
		toolBar = (
			<div className="toolbar">
				<button className="common-button" onClick={() => props.toggleEdit()}>Edit</button>
				<button className="warning-button" onClick={() => props.deleteSelectedPoem()}>Delete</button>
			</div>
		);
	}
	else{
		toolBar = (
			<div className="toolbar">
				<button className="common-button" onClick={() => props.toggleLike(like)}>{like}</button>
			</div>
		);
	}

	let lines = props.poem.content.split('\n');
	let content = lines.map((line, index) => {
		if(line.length > 0){
			return <p key={index}>{line}</p>;
		}
		else{
			return <br key={index} />
		}
	});

	const authorLink = `/profile/${props.poem.username}`;

	return (
		<div className="poemDisplay">
			<h2>{props.poem.title}</h2>
			<p className="author">
				By {props.poem.displayName} @<Link className="authLink" to={authorLink}>{props.poem.username}
				</Link></p>
			<div className="content-wrapper">{content}</div>
			<div className="toolBar-wrapper">
				<p>Likes: {props.poem.likes}</p>
				{toolBar}
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	poem: state.poem,
	auth: state.auth,
	user: state.user
});

export default connect(mapStateToProps)(PoemDisplay);