import * as actions from '../actions/user';

const initialState = {
    likes: []
};

export default function reducer(state = initialState, action) {
    if(action.type === actions.SET_LIKES) {
        return {
            likes: action.likes
        }
    }
    return state;
}