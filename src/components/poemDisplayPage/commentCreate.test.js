import React from 'react';
import {shallow, mount} from 'enzyme';

import CommentCreate from './CommentCreate.js';

describe('<CommentCreate />', () => {
	const store = {
		unsubscribe: true,
		subscribe: jest.fn(),
		getState: jest.fn(),
		dispatch: jest.fn()
	}

	it('renders without crashing', () => {
		shallow(<CommentCreate store={store} />);
	});
});