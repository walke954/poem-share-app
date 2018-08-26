import React from 'react';
import {shallow, mount} from 'enzyme';

import CreateReply from './CreateReply.js';

describe('<CreateReply />', () => {
	it('renders without crashing', () => {
		shallow(<CreateReply />);
	});
});