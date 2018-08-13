import React from 'react';
import PoemList from './PoemList.js';
import CreatePoemForm from './forms/CreatePoemForm.js';
import RequireLogin from './RequireLogin.js';
import {connect} from 'react-redux';

export function Home(props){
	return (
		<div className='home'>
			<h2>Create A New Poem</h2>
			<CreatePoemForm history={props.history} />
			<h2>User</h2>
			<PoemList username={props.user.username} history={props.history} />
			<h2>Likes</h2>
			<PoemList username={props.user.username} likes="true" history={props.history} />
		</div>
	);
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default RequireLogin()(connect(mapStateToProps)(Home));