import {SET_AUTH_TOKEN, setAuthToken, CLEAR_AUTH, clearAuth, AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess, AUTH_ERROR, authError} from './auth.js';

describe('setAuthToken', () => {
	it('should return action', () => {
		const authToken = 'ajsodifo';
		const action = setAuthToken(authToken);
		expect(action.type).toEqual(SET_AUTH_TOKEN);
		expect(action.authToken).toEqual(authToken);
	});
});

describe('clearAuth', () => {
	it('should return action', () => {
		const action2 = clearAuth();
		expect(action2.type).toEqual(CLEAR_AUTH);
	});
});

describe('authRequest', () => {
	it('should return action', () => {
		const action = authRequest();
		expect(action.type).toEqual(AUTH_REQUEST);
	});
});

describe('authSuccess', () => {
	it('should return action', () => {
		const currentUser = 'Joe'
		const action = authSuccess(currentUser);
		expect(action.type).toEqual(AUTH_SUCCESS);
		expect(action.currentUser).toEqual(currentUser);
	});
});

describe('authError', () => {
	it('should return action', () => {
		const error = 'horror!'
		const action = authError(error);
		expect(action.type).toEqual(AUTH_ERROR);
		expect(action.error).toEqual(error);
	});
});