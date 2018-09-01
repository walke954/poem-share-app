import React from 'react';
import {shallow, mount} from 'enzyme';

import {Profile} from './Profile.js';

const match = {
	params: {
		username: 'gop'
	}
}

const user = {
	username: 'gop'
}

describe('<Profile />', () => {
	it('renders without crashing', () => {
		const getUserInfo = jest.fn();
		shallow(<Profile match={match} user={user} getUserInfo={getUserInfo} />);
	});

	it('user information is retrieved upon loading', () => {
		const getUserInfo = jest.fn();
		shallow(<Profile match={match} user={user} getUserInfo={getUserInfo} />);
		expect(getUserInfo).toHaveBeenCalled();
	});
});