import { all, fork, call } from 'redux-saga/effects';
import loginSaga from './login.saga';
import navigationRootSaga from './navigation.saga';
export default function* rootSaga() {
  yield all([
    fork(navigationRootSaga),
    fork(loginSaga),
  ]);
};
