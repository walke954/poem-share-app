import React from 'react';
import {shallow, mount} from 'enzyme';

import CreateReply from './CreateReply.js';

describe('<CreateReply />', () => {
	const store = {
		unsubscribe: true,
		subscribe: jest.fn(),
		getState: jest.fn(),
		dispatch: jest.fn()
	}
	
	it('renders without crashing', () => {
		shallow(<CreateReply store={store} />);
	});
});