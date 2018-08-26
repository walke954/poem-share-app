import React from 'react';
import {shallow, mount} from 'enzyme';

import Input from './Input.js';

describe('<Input />', () => {
	it('renders without crashing', () => {
		const meta = {
			touched: false,
			error: false,
			warning: false
		}

		const input = {name: 'hello'}
		shallow(<Input meta={meta} input={input} />);
	});

	it('should render normally if there are no errors or warnings', () => {
		const meta = {
			touched: false,
			error: null,
			warning: null
		}

		const input = {name: 'hello'}
		const wrapper = shallow(<Input meta={meta} input={input} />);

		const child = wrapper.children().last();

		expect(child.hasClass('form-error')).toEqual(false);
		expect(child.hasClass('form-warning')).toEqual(false);
	});

	it('should render an error if an error has occured and has been touched', () => {
		const meta = {
			touched: true,
			error: 'error',
			warning: null
		}

		const input = {name: 'hello'}
		const wrapper = shallow(<Input meta={meta} input={input} />);
		
		const child = wrapper.children().last();

		expect(child.hasClass('form-error')).toEqual(true);
		expect(child.hasClass('form-warning')).toEqual(false);
	});

	it('should render an error if a warning has occured and has been touched', () => {
		const meta = {
			touched: true,
			error: null,
			warning: 'warning'
		}

		const input = {name: 'hello'}
		const wrapper = shallow(<Input meta={meta} input={input} />);

		const child = wrapper.children().last();

		expect(child.hasClass('form-error')).toEqual(false);
		expect(child.hasClass('form-warning')).toEqual(true);
	});
});