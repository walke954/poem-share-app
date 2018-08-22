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

	it('should select a poem if the list item is clicked upon', () => {
		let value = false;
		const wrapper = shallow(<Search />);
		
		jest.spyOn(wrapper.instance(), 'selectPoem').mockImplementation(() => {
			value = true;
		});

		wrapper.setState({poem_items: ['item1']});
		wrapper.find('.poemBlockWrapper').simulate('click');
		expect(value).toEqual(true);
	});
});