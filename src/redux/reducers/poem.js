import * as actions from '../actions/poem';

const initialState = {
	user_profile: null,
	selected_poem: null
};

export const rootReducer = (state = initialState, action) => {
	if(action.type === actions.USER_BASICS){
		return Object.assign({}, state.user_profile, {
			id: action.id,
			username: action.username,
			firstName: action.firstName,
			lastName: action.lastName,
			date: action.date,
			poems: action.poems
		});
	}
	return state;
};