import React from 'react';
import './header.css';

export default function Header(props){
	const pages = props.pages.map((page, index) => 
		<li key={index} data-name={page}>{page}</li>
	);

	return (
		<header id="header">
			<h1>{props.title}</h1>
			<ul>{pages}</ul>
		</header>
	);
};