import React from 'react';
import {shallow, mount} from 'enzyme';

import {PoemEdit} from './PoemEdit.js';

describe('<PoemEdit />', () => {
	it('renders without crashing', () => {
		const handleSubmit = jest.fn().mockImplementation();
		shallow(<PoemEdit handleSubmit={handleSubmit} />);
	});

	// it('should dispatch redux when submitted', () => {
	// 	const value = {
	// 		title: 'ahdsf',
	// 		content: 'shdifjio'
	// 	}

	// 	const handleSubmit = jest.fn().mockImplementation();
	// 	const dispatch = jest.fn().mockImplementation(() => value);
	// 	const toggleEdit = jest.fn();

	// 	const wrapper = shallow(<PoemEdit handleSubmit={handleSubmit} dispatch={dispatch} toggleEdit={toggleEdit} />);

	// 	wrapper.instance().onSubmit(value);

	// 	expect(dispatch).toHaveBeenCalled();
	// });
});