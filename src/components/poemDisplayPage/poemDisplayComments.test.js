import React from 'react';
import {shallow, mount} from 'enzyme';

import {PoemDisplayComments} from './PoemDisplayComments.js';

describe('<PoemDisplayComments />', () => {
	it('renders without crashing', () => {
		const poem = {
			comments: []
		}

		const auth = {
			username: []
		}

		shallow(<PoemDisplayComments poem={poem} auth={auth} />);
	});

	it('displays comments appropriately', () => {
		const poem = {
			id: '987w96r',
			comments: [{
				id: '986394765',
				content: 'oaisdhfois',
				username: 'aisdjfoi'
			}],
			replies: []
		}

		const auth = {
			username: []
		}

		const wrapper = shallow(<PoemDisplayComments poem={poem} auth={auth} />);

		// check to see if comments are displayed, they shouldn't be yet since they aren't displayed by default.
		expect(wrapper.find('.comment').exists()).toEqual(false);

		// click the comments button
		wrapper.find('.display-comments').simulate('click');

		// comments should now be displayed
		expect(wrapper.find('.comment').exists()).toEqual(true);
		expect(wrapper.state('comments_display')).toEqual(true);
	});

	it('create comment and create reply box displays properly', () => {
		const poem = {
			id: '987w96r',
			comments: [{
				id: '986394765',
				content: 'oaisdhfois',
				username: 'aisdjfoi'
			}],
			replies: []
		}

		const auth = {
			username: []
		}

		const wrapper = shallow(<PoemDisplayComments poem={poem} auth={auth} />);

		// display comments
		wrapper.setState({comments_display: true});

		// press comment box and check if it has appeared
		expect(wrapper.state('willComment')).toEqual(false);
		expect(wrapper.state('commentId')).toEqual('');

		wrapper.find('.createComment').simulate('click');
		wrapper.find('.createReply').simulate('click');

		expect(wrapper.state('willComment')).toEqual(true);
		expect(wrapper.state('commentId')).toEqual('986394765');
	});
});