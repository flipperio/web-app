import quotes from './quotes.js';

function randomQuote() {
	const randomIndexA = Math.floor(Math.random() * quotes.length);
	const randomIndexB = Math.floor(Math.random() * quotes.length);
	const quoteA = quotes[randomIndexA][0];
	const quoteB = quotes[randomIndexB][0];

	return `${quoteA} --- ${quoteB}`;
}

function randomDate() {
	const start = new Date();
	const end = new Date();
	start.setFullYear(start.getFullYear() - 3);

	const randDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return randDate.toLocaleDateString();
}

const mockPosts = [
	{
		_id: '1',
		title: 'Post 1',
		body: randomQuote(),
		likes: 0,
		createdOn: randomDate()
	},
	{
		_id: '2',
		title: 'Post 2',
		body: randomQuote(),
		likes: 0,
		createdOn: randomDate()
	},
	{
		_id: '3',
		title: 'Post 3',
		body: randomQuote(),
		likes: 0,
		createdOn: randomDate()
	}
];

const api = {
	fetchWallPosts: () => new Promise(function(resolve) {
		window.setTimeout(() => resolve(mockPosts), 100);
	}),

	likePost: () => new Promise(function(resolve) {
		window.setTimeout(() => resolve(), 100);
	}),

	createPost: ({ title, body }) => new Promise(function(resolve) {
		window.setTimeout(() => {
			mockPosts.push({
				_id: `${Math.random() * 100}`,
				title,
				body,
				likes: 0,
				createdOn: new Date().toLocaleDateString()
			});
			resolve();
		}, 500);
	})
};
export default api;
