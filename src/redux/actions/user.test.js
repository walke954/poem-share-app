import {SET_LIKES, setLikes} from './user.js';

describe('setLikes', () => {
	it('should return action', () => {
		const likes = ['psaidjf', 'iasjdfi'];

		const action = setLikes(likes);
		expect(action.type).toEqual(SET_LIKES);
		expect(Array.isArray(action.likes)).toEqual(true);
	});
});