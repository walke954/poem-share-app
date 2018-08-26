import React from 'react';
import {shallow, mount} from 'enzyme';

import CreatePoemForm from './createPoemForm.js';

describe('<CreatePoemForm />', () => {
	it('renders without crashing', () => {
		shallow(<CreatePoemForm />);
	});
});