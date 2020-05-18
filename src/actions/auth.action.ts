import {
  LOGIN_WITH_SAGA,
  LOGIN_WITH_SAGA_SUCCESS,
  CREATE_NEW_APP_WITH_SAGA,
  RESET_ALL_STATE
} from "constants"
import { PayloadAction } from "types/types";

export interface PayloadLogin {
  email: string,
  password: string
}

export interface PayloadCreateNewApp {
  name: string,
}

export interface RootAction {
  type: string
  payload: PayloadLogin
}

const loginWithSaga = (payload: PayloadLogin): PayloadAction<string, PayloadLogin> => {
  return {
    type: LOGIN_WITH_SAGA,
    payload
  }
}
const createNewAppWithSaga = (payload: PayloadCreateNewApp): PayloadAction<string, PayloadCreateNewApp> => {
  return {
    type: CREATE_NEW_APP_WITH_SAGA,
    payload
  }
}

const loginWithSagaSuccess = (payload: PayloadLogin): PayloadAction<string, PayloadLogin> => {
  return {
    type: LOGIN_WITH_SAGA_SUCCESS,
    payload
  }
}

const resetAllState = (): PayloadAction<string, undefined> => {
  return {
    type: RESET_ALL_STATE,
    payload: undefined,
  }
}

export {
  resetAllState,
  loginWithSaga,
  createNewAppWithSaga,
  loginWithSagaSuccess
}

