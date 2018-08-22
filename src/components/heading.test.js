import React from 'react';
import {shallow, mount} from 'enzyme';

import {Heading} from './Heading.js';
import {Link, NavLink} from 'react-router-dom';

describe('<Heading />', () => {
	it('renders without crashing', () => {
		shallow(<Heading />);
	});

	it('user is logged out when the logout component is clicked', () => {
		let value = false;
		const wrapper = shallow(<Heading />);
		
		// value will turn true if the 'logout' function is correctly called.
		jest.spyOn(wrapper.instance(), 'logout').mockImplementation(() => {
			value = true;
		});

		wrapper.find('.logout').simulate('click');
		expect(value).toEqual(true);
	});
});