import React from 'react';
import {parseMonth} from '../../utils.js';

export default function PoemBlock(props){
	const date = new Date(props.item.date).getDate();
	const year = new Date(props.item.date).getFullYear();
	const month = parseMonth(new Date(props.item.date).getMonth());

	const dateString = `${month} ${date}, ${year}`;

	return (
		<div>
			<h3>{props.item.title}</h3>
			<p>{props.item.displayName} <span className="gray-text">@{props.item.username}</span></p>
			<p>{dateString}</p>
			<p>{props.item.likes}</p>
			<p>{props.item.comments}</p>
		</div>
	);
}