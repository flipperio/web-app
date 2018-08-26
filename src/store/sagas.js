import { call, put, takeLatest } from 'redux-saga/effects';
import { actions, actionCreators } from './ducks';
import api from '../utils/api';

function* fetchWallPosts() {
	try {
		const wallPosts = yield call(api.fetchWallPosts);
		yield put(actionCreators.fetchWallPostsFinished(wallPosts));
	}
	catch (error) {
		yield put(actionCreators.fetchWallPostsFinished, []);
	}
}

export default function* saga() {
	yield takeLatest(actions.FETCH_WALL_POSTS, fetchWallPosts);
}
