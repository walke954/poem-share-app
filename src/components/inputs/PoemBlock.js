import React from 'react';
import {parseMonth} from '../../utils.js';
import {Link} from 'react-router-dom';

import './poemBlock.css';
import like_image from '../../like.png';
import comments_image from '../../comments.png';

export default function PoemBlock(props){
	const date = new Date(props.item.date).getDate();
	const year = new Date(props.item.date).getFullYear();
	const month = parseMonth(new Date(props.item.date).getMonth());

	const dateString = `${month} ${date}, ${year}`;

	const authorLink = `/profile/${props.item.username}`;

	return (
		<div className="poemBlock">
			<h4 className="poemTitle" onClick={() => props.selectPoem(props.item.id)}>{props.item.title}</h4>
			<p className="author">
				{props.item.displayName} @<Link className="authLink" to={authorLink}>{props.item.username}
				</Link>
				</p>
			<p className="author">{dateString}</p>
			<div className="icon-wrapper">
				<img src={like_image} alt="like icon" className="icon" />
				<p className="icon-number">{props.item.likes}</p>
				<img src={comments_image} alt="comments icon" className="icon" />
				<p className="icon-number">{props.item.comments}</p>
			</div>
		</div>
	);
}