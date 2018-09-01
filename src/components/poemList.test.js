import React from 'react';
import {shallow, mount} from 'enzyme';

import {PoemList} from './PoemList.js';

describe('<PoemList />', () => {
	// this component has an componentDidMount method that calls to an API, which then fills the 'poem_items' state with an array. No call is made if a 'username' prop is not passed into it, and so 'poem_items' will be empty unless filled manually.
	it('renders without crashing', () => {
		const dispatch = jest.fn().mockImplementation(() => {
			return {
				list: {
					poems: []
				}
			}
		});
		shallow(<PoemList dispatch={dispatch} />);
	});
	
	it('renders an empty list and no item found message', () => {
		const dispatch = jest.fn().mockImplementation(() => {
			return {
				list: {
					poems: []
				}
			}
		});
		const wrapper = shallow(<PoemList dispatch={dispatch} />);
		expect(wrapper.find('p').containsMatchingElement(
			<p className="noItemMessage">No items listed</p>
		)).toBeTruthy();
		expect(wrapper.state('poem_items')).toEqual([]);
	});

	it('renders a list of poems', () => {
		const dispatch = jest.fn().mockImplementation(() => {
			return {
				list: {
					poems: []
				}
			}
		});
		const wrapper = shallow(<PoemList dispatch={dispatch} />);

		// add items to list:
		wrapper.setState({poem_items: ['item1', 'item2']});
		const childWrapper = wrapper.childAt(0);
		expect(childWrapper.hasClass('poemBlockWrapper')).toEqual(true);
	});
});