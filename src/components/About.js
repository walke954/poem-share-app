import React from 'react';
import {Link} from 'react-router-dom';

import './about.css';

export default function About(props){
	return (
		<div className="about">
			<h2>Cloud Poetry...</h2>
			<p>Is that like, a book a poetry that has been launched like 15,000 feet into orbit, or something? Well, kind of. Cloud Poetry is a new kind of app that is focused on creating and sharing poetry between people of all ages, as a means of facilitating personal expression.</p>
			<p>To get started, click the registration link <Link to="/signup/">here</Link> or below to create a free profile. For return users, well, you know the drill. Once you have successfully created your profile, you can immediately start creating, browsing and sharing your favorite poems for all the world to read!</p>
		</div>
	);
}