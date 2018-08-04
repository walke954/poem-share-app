import {loadAuthToken} from '../local-storage';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const POEM_SELECT = 'POEM_SELECT';
export const poemSelect = poem => ({
	type: POEM_SELECT,
	id: poem.id,
	title: poem.title,
	username: poem.username,
	displayName: poem.displayName,
	content: poem.content,
	date: poem.date,
	likes: poem.likes,
	comments: poem.comments,
	replies: poem.replies
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = comment => ({
	type: ADD_COMMENT,
	comment
});

export const ADD_REPLY = 'ADD_REPLY';
export const addReply = (reply, index, comment_id) => ({
	type: ADD_REPLY,
	comment_id,
	index,
	reply
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

export const createComment = (poem_id, content) => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}/poem/comment`, {
        method: 'POST',
        mode: 'cors',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({poem_id, content})
    })
	    .then(res => normalizeResponseErrors(res))
	    .then(res => res.json())
	    .then(res => dispatch(addComment(res)))
	    .catch(err => {
	        const message = 'Sorry! Your comment could not be posted. Please try again.';
	        return Promise.reject(
	            new SubmissionError({
	                _error: message
	            })
	        );
	    });
}

export const createReply = (poem_id, index, comment_id, content) => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}/poem/comment/reply`, {
        method: 'POST',
        mode: 'cors',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({poem_id, comment_id, content})
    })
	    .then(res => normalizeResponseErrors(res))
	    .then(res => res.json())
	    .then(res => dispatch(addReply(res, index, comment_id)))
	    .catch(err => {
	        const message = 'Sorry! Your comment could not be posted. Please try again.';
	        return Promise.reject(
	            new SubmissionError({
	                _error: message
	            })
	        );
	    });
}

export const getSelectPoem = id => dispatch => {
	return fetch(`${API_BASE_URL}/poem/?id=${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
           'Content-Type': 'application/json',
        }
    })
	    .then( res => {
	    	if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
	    .then(res => {
	    	const poem = dispatch(normalizeSelectedPoem(res.poem));
	    	dispatch(poemSelect(poem));
	    })
	    .then(() => Promise.resolve())
	    .catch(err => {
	        console.error(err);
	    });
}

export const normalizeSelectedPoem = poem => dispatch => {
	const comments = [];
	const replies = [];

	poem.comments.forEach(comment => {
		comments.push({
			id: comment._id,
			username: comment.username,
			displayName: comment.displayName,
			content: comment.content,
			date: comment.date
		});
		comment.replies.forEach((reply, index) => {
			replies.push({
    			id: reply._id,
				username: reply.username,
				displayName: reply.displayName,
				content: reply.content,
				date: reply.date,
    			comment_id: comment._id,
    			index: index
    		})
		})
	});

	return {
		type: POEM_SELECT,
		id: poem._id,
		title: poem.title,
		username: poem.username,
		displayName: poem.displayName,
		content: poem.content,
		date: poem.date,
		likes: poem.likes,
		comments: comments,
		replies: replies
	}
}