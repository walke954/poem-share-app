import React from 'react';
import {shallow, mount} from 'enzyme';

import CommentCreate from './CommentCreate.js';

describe('<CommentCreate />', () => {
	it('renders without crashing', () => {
		shallow(<CommentCreate />);
	});
});