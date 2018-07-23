import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const fetchUserDataSuccess = data => ({
    type: FETCH_USER_DATA_SUCCESS,
    data
});

export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';
export const fetchUserDataError = error => ({
    type: FETCH_USER_DATA_ERROR,
    error
});

export const fetchUserData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchUserDataSuccess(data)))
        .catch(err => {
            dispatch(fetchUserDataError(err));
        });
};