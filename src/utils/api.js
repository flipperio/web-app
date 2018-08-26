const mockPosts = [
	{
		_id: '1',
		title: 'Post 1',
		body: 'Post 1 Body',
		comments: 0,
		likes: 0,
		createdOn: ''
	},
	{
		_id: '2',
		title: 'Post 2',
		body: 'Post 2 Body',
		comments: 0,
		likes: 0,
		createdOn: ''
	},
	{
		_id: '3',
		title: 'Post 3',
		body: 'Post 3 Body',
		comments: 0,
		likes: 0,
		createdOn: ''
	}
];

const api = {
	fetchWallPosts: () => new Promise(function(resolve) {
		window.setTimeout(() => resolve(mockPosts), 100);
	}),

	likePost: () => new Promise(function(resolve) {
		window.setTimeout(() => resolve(), 100);
	})
};
export default api;
