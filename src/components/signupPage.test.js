import React from 'react';
import {shallow, mount} from 'enzyme';

import {SignupPage} from './SignupPage.js';

describe('<Search />', () => {
	it('renders without crashing', () => {
		shallow(<SignupPage />);
	});

	it('should not render page if not logged in', () => {
		const wrapper = shallow(<SignupPage loggedIn="true" />);
		expect(wrapper.hasClass('loginPage')).toEqual(false);
	});
});