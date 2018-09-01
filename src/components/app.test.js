import React from 'react';
import {shallow, mount} from 'enzyme';

import {App} from './App.js';

describe('<App />', () => {
	it('renders without crashing', () => {
		shallow(<App />);
	});

	it('should display the the correct heading', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.hasClass('heading')).toEqual(false);
	});
});