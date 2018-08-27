import {setAuthToken, clearAuth, authRequest, authSuccess, authError} from '../actions/auth.js';
import reducer from './auth.js';

describe('authReducer', () => {
	const defaultState = {
		authToken: null,
	    currentUser: null,
	    loading: false,
	    error: null
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

    describe('setAuthToken', () => {
    	const authToken = 'osdfooij'

	    it('should return a changed state', () => {
	    	let state;
	        state = reducer(state, setAuthToken(authToken));
	        expect(state).toEqual({
				authToken: authToken,
			    currentUser: null,
			    loading: false,
			    error: null
			});
	    });
	});

	describe('clearAuth', () => {
    	const authToken = 'osdfooij'

	    it('should return a changed state', () => {
	    	let state = {
				authToken: authToken,
			    currentUser: null,
			    loading: false,
			    error: null
			}
	        state = reducer(state, clearAuth());
	        expect(state).toEqual({
				authToken: null,
			    currentUser: null,
			    loading: false,
			    error: null
			});
	    });
	});

	describe('authRequest', () => {
	    it('should return a changed state', () => {
	    	let state = {
				authToken: null,
			    currentUser: null,
			    loading: false,
			    error: null
			}
	        state = reducer(state, authRequest());
	        expect(state).toEqual({
				authToken: null,
			    currentUser: null,
			    loading: true,
			    error: null
			});
	    });
	});

	describe('authSuccess', () => {
    	const currentUser = 'osdfooij'

	    it('should return a changed state', () => {
	    	let state = {
				authToken: null,
			    currentUser: null,
			    loading: false,
			    error: null
			}
	        state = reducer(state, authSuccess(currentUser));
	        expect(state).toEqual({
				authToken: null,
			    currentUser: currentUser,
			    loading: false,
			    error: null
			});
	    });
	});

	describe('authError', () => {
    	const error = 'osdfooij'

	    it('should return a changed state', () => {
	    	let state = {
				authToken: null,
			    currentUser: null,
			    loading: false,
			    error: null
			}
	        state = reducer(state, authError(error));
	        expect(state).toEqual({
				authToken: null,
			    currentUser: null,
			    loading: false,
			    error: error
			});
	    });
	});
});