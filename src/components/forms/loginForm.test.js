import React from 'react';
import {shallow, mount} from 'enzyme';

import LoginForm from './LoginForm.js';
import {Field, reduxForm, focus} from 'redux-form';

describe('<LoginForm />', () => {
	it('renders without crashing', () => {
		shallow(<LoginForm />);
	});
});