import React from 'react';
import {connect} from 'react-redux';

import './poemDisplay.css';

export function PoemDisplay(props){
	let like = props.user.likes.findIndex(like => like === props.poem.id) === -1 ? 'like' : 'unlike';
	
	let toolBar;
	if(props.auth.currentUser !== null && props.poem.username === props.auth.currentUser.username){
		toolBar = (
			<div>
				<button onClick={() => props.toggleEdit()}>Edit</button>
				<button onClick={() => props.deleteSelectedPoem()}>Delete</button>
			</div>
		);
	}
	else{
		toolBar = (
			<div>
				<button onClick={() => props.toggleLike(like)}>{like}</button>
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

	return (
		<div className="poemDisplay">
			<h2>{props.poem.title}</h2>
			<div>{content}</div>
			<div className="toolBar-wrapper">
				{toolBar}
				<p>{props.poem.displayName} <span className="gray-text">@{props.poem.username}</span></p>
				<p>Likes: {props.poem.likes}</p>
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