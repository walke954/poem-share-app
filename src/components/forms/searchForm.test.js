import React from 'react';
import {shallow, mount} from 'enzyme';

import SearchForm from './SearchForm.js';

describe('<SearchForm />', () => {
	it('renders without crashing', () => {
		shallow(<SearchForm />);
	});

	it('should submit correctly and trigger both prop functions', () => {
		// mock API callback
		const getPoemList = jest.fn().mockImplementation(() => {
			console.log('Get Poem List');
		});

		// should reset page if submitted
		const resetPage = jest.fn().mockImplementation(() => {
			console.log('Page Reset');
		});

		const wrapper = mount(<SearchForm getPoemList={getPoemList} resetPage={resetPage} />);

		const testInput = 'test'

		expect(wrapper.state('value')).toEqual('');

		wrapper.find('.search-input').instance().value = testInput;
		expect(wrapper.find('.search-input').instance().value).toEqual(testInput);
		wrapper.simulate('submit');

		expect(resetPage).toHaveBeenCalled();
	});
});