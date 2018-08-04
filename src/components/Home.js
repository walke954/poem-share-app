import React from 'react';
import PoemList from './PoemList.js'

export default function Home(props){
	return (
		<div className='home'>
			<h2>User</h2>
			<PoemList username="hello" history={props.history} orientation="horizontal" />
			<h2>Search</h2>
			<PoemList search="ham" history={props.history} orientation="vertical" />
		</div>
	);
}