import React from 'react';
import {parseMonth} from '../../utils.js';

import './poemBlock.css';
import like_image from '../../like.png';
import comments_image from '../../comments.png';

export default function PoemBlock(props){
	const date = new Date(props.item.date).getDate();
	const year = new Date(props.item.date).getFullYear();
	const month = parseMonth(new Date(props.item.date).getMonth());

	const dateString = `${month} ${date}, ${year}`;

	return (
		<div className="poemBlock">
			<h4>{props.item.title}</h4>
			<p>{props.item.displayName} <span className="gray-text">@{props.item.username}</span></p>
			<p className="date">{dateString}</p>
			<div>
				<img src={like_image} alt="like icon" className="icon" />
				<p className="icon-number">{props.item.likes}</p>
				<img src={comments_image} alt="comments icon" className="icon" />
				<p className="icon-number">{props.item.comments}</p>
			</div>
		</div>
	);
}