import React from 'react';
import {shallow, mount} from 'enzyme';

import {PoemDisplay} from './PoemDisplay.js';

describe('<PoemDisplay />', () => {
	it('renders without crashing', () => {
		const user = {
			likes: []
		}

		const poem = {
			id: '7102501',
			username: 'hello',
			content: 'aosdhfoih'
		}

		const auth = {
			currentUser: {
				username: 'example'
			}
		}

		shallow(<PoemDisplay user={user} poem={poem} auth={auth} />);
	});

	it('should display user toolbar if poem and currentUser usernames are same', () => {
		const user = {
			likes: []
		}

		const poem = {
			id: '7102501',
			username: 'hello',
			content: 'aosdhfoih'
		}

		const auth = {
			currentUser: {
				username: 'hello'
			}
		}

		const wrapper = shallow(<PoemDisplay user={user} poem={poem} auth={auth} />);
		const toolbar = wrapper.find('.toolbar');
		const children = toolbar.children().getElements();

		// check if there are two elements in toolbar
		expect(children.length).toEqual(2);

		// check that toolbar elements contain appropriate text
		expect(toolbar.childAt(0).text()).toEqual('Edit');
		expect(toolbar.childAt(1).text()).toEqual('Delete');
	});

	it('should display a non-user toolbar if poem and currentUser usernames are different', () => {
		const user = {
			likes: []
		}

		const poem = {
			id: '7102501',
			username: 'hello',
			content: 'aosdhfoih'
		}

		const auth = {
			currentUser: {
				username: 'example'
			}
		}

		const wrapper = shallow(<PoemDisplay user={user} poem={poem} auth={auth} />);
		const toolbar = wrapper.find('.toolbar');
		const children = toolbar.children().getElements();

		// check if there is one element in toolbar
		expect(children.length).toEqual(1);

		// check that the toolbar element contain appropriate text
		expect(toolbar.childAt(0).text()).toEqual('like' || 'unlike');
	});
});