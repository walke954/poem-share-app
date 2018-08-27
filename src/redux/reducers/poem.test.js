import {poemSelect, addComment, addReply, edit, remove, toggleLike} from '../actions/poem.js';
import reducer from './poem.js';

describe('poemReducer', () => {
	const defaultState = {
		id: null,
		title: null,
		username: null,
		displayName: null,
		content: null,
		date: null,
		likes: null,
		comments: null,
		replies: null
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

    describe('poemSelect', () => {
    	const poemData = {
    		id: 'sdoihf',
			title: 'oasnogd',
			username: 'zhugos',
			displayName: 'jixchu',
			content: 'uwihf',
			date: new Date(),
			likes: 9,
			comments: [],
			replies: []
    	}

	    it('should return a changed state', () => {
	    	let state;
	        state = reducer(state, poemSelect(poemData));
	        expect(state).toEqual(poemData);
	    });
	});

	describe('addComment', () => {
	    const commentData = {
    		_id: 'usdifu',
			username: 'isndihfuu',
			displayName: 'isndiuf',
			content: 'oixcjvoij',
			date: new Date()
    	}

	    it('should return a changed state', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: new Date(),
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, addComment(commentData));
	        expect(state.comments[0]).toEqual({
	    		id: commentData._id,
				username: commentData.username,
				displayName: commentData.displayName,
				content: commentData.content,
				date: commentData.date
	    	});
	    });
	});

	describe('addReply', () => {
	    const replyData = {
    		_id: 'usdifu',
			username: 'isndihfuu',
			displayName: 'isndiuf',
			content: 'oixcjvoij',
			date: new Date(),
    	}

    	const comment_id = 'shodjfi';
		const index = 5;

	    it('should return a changed state', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: new Date(),
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, addReply(replyData, index, comment_id));
	        expect(state.replies[0]).toEqual({
	    		id: replyData._id,
				username: replyData.username,
				displayName: replyData.displayName,
				content: replyData.content,
				date: replyData.date,
				comment_id: comment_id,
				index: index
	    	});
	    });
	});

	describe('edit', () => {
		const title = 'ihogish';
		const content = 'hfio';
		const date = new Date();

	    it('should return a changed state', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: date,
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, edit(title, content));
	        expect(state).toEqual({
	    		id: 'sdoihf',
				title: title,
				username: 'zhugos',
				displayName: 'jixchu',
				content: content,
				date: date,
				likes: 9,
				comments: [],
				replies: []
	    	});
	    });
	});

	describe('remove', () => {
	    it('should return a changed state', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: new Date(),
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, remove());
	        expect(state).toEqual(defaultState);
	    });
	});

	describe('toggleLike', () => {
		const date = new Date();
		const increment1 = 1;
		const increment2 = -1;

	    it('should add a like', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: date,
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, toggleLike(increment1));
	        expect(state).toEqual({
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: date,
				likes: 10,
				comments: [],
				replies: []
	    	});
	    });

	    it('should subtract a like', () => {
	    	let state = {
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: date,
				likes: 9,
				comments: [],
				replies: []
	    	}
	        state = reducer(state, toggleLike(increment2));
	        expect(state).toEqual({
	    		id: 'sdoihf',
				title: 'oasnogd',
				username: 'zhugos',
				displayName: 'jixchu',
				content: 'uwihf',
				date: date,
				likes: 8,
				comments: [],
				replies: []
	    	});
	    });
	});
});