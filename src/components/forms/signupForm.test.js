import React from 'react';
import {shallow, mount} from 'enzyme';

import SignupForm from './SignupForm.js';

describe('<SignupForm />', () => {
	it('renders without crashing', () => {
		shallow(<SignupForm />);
	});
});