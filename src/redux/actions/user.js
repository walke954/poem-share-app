import {SubmissionError} from 'redux-form';
import {loadAuthToken} from '../local-storage';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './utils';

export const SET_LIKES = 'SET_LIKES';
export const setLikes = likes => ({
    type: SET_LIKES,
    likes
});

export const getLikes = () => dispatch => {
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/user/likes`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'content-type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(setLikes(res.likes)))
        .catch(err => {
            console.log(err);
            const message = 'Could not retrieve likes'
            return Promise.reject({
                _error: message
            });
        });
}

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};