export const actions = {
	FETCH_WALL_POSTS: 'FETCH_WALL_POSTS',
	FETCH_WALL_POSTS_FINISHED: 'FETCH_WALL_POSTS_FINISHED',
	OPEN_CREATE_MODAL: 'OPEN_CREATE_MODAL',
	CLOSE_CREATE_MODAL: 'CLOSE_CREATE_MODAL'
};

export const actionCreators = {
	fetchWallPosts: () => ({ type: actions.FETCH_WALL_POSTS }),
	fetchWallPostsFinished: posts => ({ type: actions.FETCH_WALL_POSTS_FINISHED, posts }),
	openCreateModal: () => ({ type: actions.OPEN_CREATE_MODAL }),
	closeCreateModal: () => ({ type: actions.CLOSE_CREATE_MODAL })
};

const initialState = {
	wall: {
		posts: []
	},
	createModal: {
		open: false
	}
};

export function reducer(state, action) {
	if (state === undefined) {
		return initialState;
	}

	switch (action.type) {
		case actions.FETCH_WALL_POSTS_FINISHED:
			return Object.assign({}, state, { wall: { posts: action.posts } });
		case actions.OPEN_CREATE_MODAL:
			return Object.assign({}, state, { createModal: { open: true } });
		case actions.COSE_CREATE_MODAL:
			return Object.assign({}, state, { createModal: { open: false } });
		default:
			return state;
	}
}
