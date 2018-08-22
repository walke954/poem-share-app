import React from 'react';
import {shallow, mount} from 'enzyme';

import {Home} from './Home.js';

const user = {
	id: '980203756',
	username: 'hello',
	displayName: 'Hello World',
	date: new Date()
}

describe('<Home />', () => {
	it('renders without crashing', () => {
		shallow(<Home user={user} />);
	});

	it('should contain correct components', () => {
		const wrapper = shallow(<Home user={user} />);
		expect(wrapper.childAt(0).hasClass('create-poem-button')).toEqual(true);
		expect(wrapper.childAt(1).hasClass('createPoemBlock')).toEqual(true);
		expect(wrapper.childAt(2).hasClass('poemList-wrapper')).toEqual(true);
		expect(wrapper.childAt(3).hasClass('poemList-wrapper')).toEqual(true);
	});

	it('should toggle the create poem button', () => {
		const wrapper = shallow(<Home user={user} />);
		expect(wrapper.state('createPoem')).toEqual(false);
		wrapper.find('.create-poem-button').simulate('click');
		expect(wrapper.state('createPoem')).toEqual(true);
	});
});