import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOGOUT_WITH_SAGA,
  LOGIN_WITH_SAGA,
  HOME_SCREEN,
  LOGIN_SCREEN,
  CREATE_NEW_APP_WITH_SAGA,
  IS_SETUP,
} from "constants/"
import { PayloadAction } from 'types/types';
import { PayloadLogin, PayloadCreateNewApp, resetAllState } from 'actions/auth.action';
import { navigationRootAction } from 'actions/navigation.action';
import NavigationActionsService from '@utils/navigation';
import BaseService from 'services';
import AsyncStorage from '@react-native-community/async-storage';

function* logout() {
  yield put(navigationRootAction({ name: LOGIN_SCREEN }))
  yield put(resetAllState());
}

function* login(action: PayloadAction<string, PayloadLogin>) {
  const { email, password } = action.payload;
  NavigationActionsService.showLoading();
  try {

    yield put(navigationRootAction({ name: HOME_SCREEN }))
  } catch (err) {

  }
  NavigationActionsService.hideLoading();
}

function* createNewApp(action: PayloadAction<string, PayloadCreateNewApp>) {
  const { name } = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield BaseService.instance.auth.createNewAppId({name})
    const {_id} = response;
    if (_id && name) {
      yield AsyncStorage.setItem(IS_SETUP, 'success')
    }
    yield put(navigationRootAction({ name: HOME_SCREEN }))
  } catch (err) {

  }
  NavigationActionsService.hideLoading();
}

function* loginSaga() {
  yield takeLatest(LOGOUT_WITH_SAGA, logout)
  yield takeLatest(LOGIN_WITH_SAGA, login)
  yield takeLatest(CREATE_NEW_APP_WITH_SAGA, createNewApp)
}

export default loginSaga