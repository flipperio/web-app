export const actions = {
	FETCH_WALL_POSTS: 'FETCH_WALL_POSTS',
	FETCH_WALL_POSTS_FINISHED: 'FETCH_WALL_POSTS_FINISHED',
	SET_WALL_FETCH_IN_PROGRESS: 'SET_WALL_FETCH_IN_PROGRESS',
	SET_LAST_REQUEST_EMPTY: 'SET_LAST_REQUEST_EMPTY',
	PAGE_WALL_POSTS: 'PAGE_WALL_POSTS',
	RESET_WALL_POSTS: 'RESET_WALL_POSTS',
	OPEN_CREATE_MODAL: 'OPEN_CREATE_MODAL',
	CLOSE_CREATE_MODAL: 'CLOSE_CREATE_MODAL'
};

export const actionCreators = {
	fetchWallPosts: () => ({ type: actions.FETCH_WALL_POSTS }),
	fetchWallPostsFinished: posts => ({ type: actions.FETCH_WALL_POSTS_FINISHED, posts }),
	setWallFetchInProgress: inProgress => ({ type: actions.SET_WALL_FETCH_IN_PROGRESS, inProgress }),
	setLastRequestEmpty: wasEmpty => ({ type: actions.SET_LAST_REQUEST_EMPTY, wasEmpty }),
	pageWallPosts: () => ({ type: actions.PAGE_WALL_POSTS }),
	resetWallPosts: () => ({ type: actions.RESET_WALL_POSTS }),
	openCreateModal: () => ({ type: actions.OPEN_CREATE_MODAL }),
	closeCreateModal: () => ({ type: actions.CLOSE_CREATE_MODAL })
};

const initialState = {
	wall: {
		posts: [],
		page: 0,
		requestInProgress: false,
		lastRequestEmpty: true
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
		case actions.FETCH_WALL_POSTS_FINISHED: {
			const wall = { ...state.wall, posts: state.wall.posts.concat(action.posts) };
			return { ...state, wall };
		}
		case actions.SET_WALL_FETCH_IN_PROGRESS: {
			const wall = { ...state.wall, requestInProgress: action.inProgress };
			return { ...state, wall };
		}
		case actions.SET_LAST_REQUEST_EMPTY: {
			const wall = { ...state.wall, lastRequestEmpty: action.wasEmpty };
			return { ...state, wall };
		}
		case actions.PAGE_WALL_POSTS: {
			const wall = { ...state.wall, page: state.wall.page + 1 };
			return { ...state, wall };
		}
		case actions.RESET_WALL_POSTS: {
			return { ...state, wall: initialState.wall };
		}
		case actions.OPEN_CREATE_MODAL: {
			return { ...state, createModal: { open: true } };
		}
		case actions.CLOSE_CREATE_MODAL: {
			return { ...state, createModal: { open: false } };
		}
		default:
			return state;
	}
}
