import {loadAuthToken} from '../local-storage';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const POEM_SELECT = 'POEM_SELECT';
export const poemSelect = () => ({
	type: POEM_SELECT,
});

export const POEM_LIST = 'POEM_LIST';
export const poemList = () => ({
	type: POEM_LIST,
});

export const USER_BASICS = 'USER_BASICS';
export const userBasics = (user_basics) => ({
	type: USER_BASICS,
	id: user_basics.id,
	username: user_basics.username,
	firstName: user_basics.firstName,
	lastName: user_basics.lastName,
	date: user_basics.date,
	poems: user_basics.poems
});

export const createPoem = (title, content) => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}/poem`, {
        method: 'POST',
        mode: 'cors',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({title, content})
    })
    .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const message = 'Sorry! there was a problem creating the poem. Please try again.';
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            );
        });
}