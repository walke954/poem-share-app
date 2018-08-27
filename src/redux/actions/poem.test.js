import {POEM_SELECT, poemSelect, ADD_COMMENT, addComment, ADD_REPLY, addReply, EDIT, edit, REMOVE, remove, TOGGLE_LIKE, toggleLike} from './poem.js';

describe('poemSelect', () => {
	it('should return action', () => {
		const poem = {
			id: 'jasdfj',
			title: 'uahsdfh',
			username: 'ohfigh',
			displayName: 'oashdfoih',
			content: 'onowneoifi',
			date: new Date(),
			likes: 7,
			comments: 'aushdfu',
			replies: 'oaushdfou'
		}

		const action = poemSelect(poem);
		expect(action.type).toEqual(POEM_SELECT);
		expect(action.id).toEqual(poem.id);
		expect(action.username).toEqual(poem.username);
		expect(action.likes).toEqual(poem.likes);
	});
});

describe('addComment', () => {
	it('should return action', () => {
		const comment = 'blahhhhhhhh';
		const action = addComment(comment);
		expect(action.type).toEqual(ADD_COMMENT);
		expect(action.comment).toEqual(comment);
	});
});

describe('addReply', () => {
	it('should return action', () => {
		const reply = {
			reply: 'blahhhhhhhh',
			comment_id: 'osidjf',
			index: 7
		}
		const action = addReply(reply.reply, reply.index, reply.comment_id);
		expect(action.type).toEqual(ADD_REPLY);
		expect(action.reply).toEqual(reply.reply);
		expect(action.comment_id).toEqual(reply.comment_id);
		expect(action.index).toEqual(reply.index);
	});
});

describe('edit', () => {
	it('should return action', () => {
		const title = 'osdhf';
		const content = 'osidhfoi';

		const action = edit(title, content);
		expect(action.type).toEqual(EDIT);
		expect(action.title).toEqual(title);
		expect(action.content).toEqual(content);
	});
});

describe('remove', () => {
	it('should return action', () => {
		const action = remove();
		expect(action.type).toEqual(REMOVE);
	});
});

describe('toggleLike', () => {
	it('should return action', () => {
		const increment = 1

		const action = toggleLike(increment);
		expect(action.type).toEqual(TOGGLE_LIKE);
		expect(action.increment).toEqual(increment);
	});
});