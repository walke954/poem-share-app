import React from 'react';
import {shallow, mount} from 'enzyme';

import {Search} from './Search.js';

describe('<Search />', () => {
	it('renders without crashing', () => {
		shallow(<Search />);
	});

	it('renders a list of poems', () => {
		const wrapper = shallow(<Search />);

		// add items to list:
		wrapper.setState({poem_items: ['item1', 'item2']});
		const childWrapper = wrapper.childAt(1);
		expect(childWrapper.hasClass('poemBlockWrapper')).toEqual(true);
	});

	it('should reset the state when resetPage() is called', () => {
		const wrapper = shallow(<Search />);

		const defaultState = {
			page: 0,
			poem_items: [],
			keyword: '',
			end: false
		}

		const testState = {
			page: 1,
			poem_items: ['item1'],
			keyword: 'hello',
			end: true
		}

		//set the new test state
		wrapper.setState(testState);
		expect(wrapper.state()).toEqual(testState);

		// reset the test state
		wrapper.instance().resetPage();
		expect(wrapper.state()).toEqual(defaultState);
	});
});