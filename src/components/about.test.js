import React from 'react';
import {shallow, mount} from 'enzyme';

import About from './About.js';

describe('<About />', () => {
	it('renders without crashing', () => {
		shallow(<About />);
	});
});