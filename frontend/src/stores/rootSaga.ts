import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import userSaga from './user/saga';
import questionSaga from './question/saga';
import tagSaga from './tag/saga';
import settingSaga from './setting/saga';
// import postSaga from './posts/saga';
// import commentSaga from '@stores/comment/saga.js';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(questionSaga),
    fork(tagSaga),
    fork(settingSaga),
  ]);
}

export default rootSaga;