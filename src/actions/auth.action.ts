import {
  LOGIN_WITH_SAGA,
  LOGIN_WITH_SAGA_SUCCESS,
  RESET_ALL_STATE
} from "constants"
import { PayloadAction } from "types/types";

export interface PayloadLogin {
  email: string,
  password: string
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
  loginWithSagaSuccess
}

