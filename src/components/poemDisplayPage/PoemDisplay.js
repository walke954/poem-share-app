import React from 'react';
import {connect} from 'react-redux';

export function PoemDisplay(props){
	let edit;
	if(props.poem.username === props.auth.currentUser.username){
		edit = <button onClick={() => this.props.history.push('/edit')}>Edit</button>;
	}

	return (
		<div>
			<h2>{props.poem.title}</h2>
			{edit}
			<p>{props.poem.displayName} <span className="gray-text">@{props.poem.username}</span></p>
			<p>Likes: {props.poem.likes}</p>
			<p>{props.poem.content}</p>
		</div>
	);
}

const mapStateToProps = state => ({
	poem: state.poem,
	auth: state.auth
});

export default connect(mapStateToProps)(PoemDisplay);