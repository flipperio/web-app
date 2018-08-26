import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './ducks.js';
import saga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store;
