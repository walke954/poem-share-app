// import * as actions from '../actions';

const initialState = {
	poems: [
		{
			title: 'Example 1',
			username: 'AuthorOFEverything',
			content: 'This is a great poem, I promise :)',
			likes: 4,
			comments: [
				{
					username: 'hello',
					content: 'I love how direct this poem is.',
					replies: [
						{
							username: 'hello',
							content: 'I also love you'
						},
						{
							username: 'AuthorOFEverything',
							content: 'thanks :)'
						}

					]
				},
				{
					username: 'OneOfAKind',
					content: 'I smell greatness.',
					replies: []
				},
				{
					username: 'hello',
					content: 'I love how direct this poem is.',
					replies: [
						{
							username: 'hello',
							content: 'I also love you'
						},
						{
							username: 'AuthorOFEverything',
							content: 'thanks :)'
						}

					]
				},
				{
					username: 'OneOfAKind',
					content: 'I smell greatness.',
					replies: []
				}
			]
		},
		{
			title: 'Example 2',
			username: 'AuthorOFEverything',
			content: 'One fish, two fish, red fish, fucking ridiculous',
			likes: 1,
			comments: [
				{
					username: 'hello',
					content: 'Gross',
					replies: [
						{
							username: 'AuthorOFEverything',
							content: 'thats how I like it'
						}

					]
				},
				{
					username: 'OneOfAKind',
					content: 'This is special',
					replies: [
						{
							username: 'hello',
							content: 'I dont think we are reading the same poem...'
						}
					]
				},
			]
		}
	]
};

export const poemState = (state = initialState, action) => {
	return state;
};