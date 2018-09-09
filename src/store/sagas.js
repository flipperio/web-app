import { select, call, put, takeEvery } from 'redux-saga/effects';
import { actions, actionCreators } from './ducks';
import api from '../utils/api';

function* fetchWallPosts() {
	try {
		const requestInProgress = yield select(state => state.wall.requestInProgress);
		if (!requestInProgress) {
			yield put(actionCreators.setWallFetchInProgress(true));
			const page = yield select(state => state.wall.page);
			const wallPosts = yield call(api.fetchWallPosts, page);

			if (wallPosts.length === 0) {
				yield put(actionCreators.setLastRequestEmpty(true));
			}
			else {
				yield put(actionCreators.setLastRequestEmpty(false));
			}

			yield put(actionCreators.setWallFetchInProgress(false));
			yield put(actionCreators.fetchWallPostsFinished(wallPosts));
		}
	}
	catch (error) {
		console.error('Error fetching wall posts', error);
		yield put(actionCreators.setLastRequestEmpty(true));
		yield put(actionCreators.setWallFetchInProgress(false));
		yield put(actionCreators.fetchWallPostsFinished([]));
	}
}

export default function* saga() {
	yield takeEvery(actions.FETCH_WALL_POSTS, fetchWallPosts);
}
