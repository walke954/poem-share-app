import * as actions from '../actions/poem';

const initialState = {
	id: null,
	title: null,
	username: null,
	displayName: null,
	content: null,
	date: null,
	likes: null,
	comments: null
};


export default function reducer(state = initialState, action){
	if(action.type === actions.POEM_SELECT){
		return Object.assign({}, state, {
			id: action.id,
			title: action.title,
			username: action.username,
			displayName: action.displayName,
			content: action.content,
			date: action.date,
			likes: action.likes,
			comments: action.comments,
			replies: action.replies
		});
	}

	else if(action.type === actions.ADD_COMMENT){
		return {
			...state,
			comments: [
				...state.comments,
				{
					id: action.comment._id,
					username: action.comment.username,
					displayName: action.comment.displayName,
					content: action.comment.content,
					date: action.comment.date,
				}
			]
		}
	}
	else if(action.type === actions.ADD_REPLY){
		return {
			...state,
			replies: [
				...state.replies,
				{
					id: action.reply._id,
					username: action.reply.username,
					displayName: action.reply.displayName,
					content: action.reply.content,
					date: action.reply.date,
					comment_id: action.comment_id,
					index: action.index
				}
			]
		}
	}

	return state;
};