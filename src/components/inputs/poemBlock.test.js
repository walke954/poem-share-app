import React from 'react';
import {shallow, mount} from 'enzyme';

import PoemBlock from './PoemBlock.js';

describe('<PoemBlock />', () => {
	it('renders without crashing', () => {
		const item = {
			title: 'sdf',
			username: 'sdf',
			displayName: 'sdf',
			date: new Date(),
			likes: 0,
			comments: 0
		}

		shallow(<PoemBlock item={item} />);
	});
});