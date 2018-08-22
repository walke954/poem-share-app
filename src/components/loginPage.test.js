import React from 'react';
import {shallow, mount} from 'enzyme';

import {LoginPage} from './LoginPage.js';

describe('<LoginPage />', () => {
	it('renders without crashing', () => {
		shallow(<LoginPage />);
	});

	it('should not render page if not logged in', () => {
		const wrapper = shallow(<LoginPage loggedIn="true" />);
		expect(wrapper.hasClass('loginPage')).toEqual(false);
	});
});