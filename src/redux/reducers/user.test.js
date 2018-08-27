import {setLikes} from '../actions/user';
import reducer from './user.js';

describe('userReducer', () => {
	const defaultState = {
		likes: []
	}

	it('should return initial state', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(defaultState);
    });

    it('should return the current state on an unknown action', () => {
        let currentState = {
        	teeth: 4
        };
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
        expect(state.teeth).toBe(currentState.teeth);
    });

    describe('setLikes', () => {
    	const likes = ['sodhfo', 'wiubeiub'];
	    it('should return a changed state', () => {
	    	let state;
	        state = reducer(state, setLikes(likes));
	        expect(state).toEqual({
	        	likes: ['sodhfo', 'wiubeiub']
	        });
	    });
	});
});