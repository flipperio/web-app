function apiUrl(endpoint) {
	return `${process.env.API_URL}/${endpoint}`;
}


const api = {
	makeRequest: (url, method = 'GET', options = {}) => window.fetch(url, { method, ...options })
	.then(function(response) {
		if (!response.ok) {
			throw response;
		}

		return response.json();
	}),
	fetchWallPosts: (page = 0, count = 10) => api.makeRequest(apiUrl(`posts/?page=${page}&count=${count}`), 'GET'),
	likePost: postId => api.makeRequest(apiUrl(`posts/${postId}/like`), 'POST'),
	createPost: ({ title, body }) => {
		const headers = { 'Content-Type': 'application/json' };
		const requestBody = JSON.stringify({ title, body });
		return api.makeRequest(apiUrl('posts'), 'POST', { headers, body: requestBody });
	}
};
export default api;
