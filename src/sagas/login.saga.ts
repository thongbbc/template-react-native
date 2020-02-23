import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOGOUT_WITH_SAGA,
  LOGIN_WITH_SAGA,
  HOME_SCREEN
} from "constants/"
import { PayloadAction } from 'types/types';
import { PayloadLogin, resetAllState } from 'actions/auth.action';
import { navigationRootAction } from 'actions/navigation.action';
import NavigationActionsService from '@utils/navigation';

function* logout() {
  yield put(resetAllState());
}

function* login(action: PayloadAction<string, PayloadLogin>) {
  const { email, password } = action.payload;
  NavigationActionsService.showLoading();
  try {
    const callApi = yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          status: 200
        })
      }, 3000);
    })
    yield put(navigationRootAction({ name: HOME_SCREEN }))
  } catch (err) {

  }
  NavigationActionsService.hideLoading();
}

function* loginSaga() {
  yield takeLatest(LOGOUT_WITH_SAGA, logout)
  yield takeLatest(LOGIN_WITH_SAGA, login)
}

export default loginSaga