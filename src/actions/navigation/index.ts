import {
  NAVIGATION_ROOT_WITH_EPIC,
  NAVIGATION_ROOT_SUCCESS
} from "../../constants"
import { PayloadAction } from "src/types/types";

export interface PayloadNavigationRoot {
  name: string
}

export interface RootAction {
  type: string
  payload: PayloadNavigationRoot
}

const navigationRootAction = (payload: PayloadNavigationRoot): PayloadAction<string, PayloadNavigationRoot> => {
  return {
    type: NAVIGATION_ROOT_WITH_EPIC,
    payload
  }
}

const navigationRootSuccess = (payload: PayloadNavigationRoot): PayloadAction<string, PayloadNavigationRoot> => {
  return {
    type: NAVIGATION_ROOT_SUCCESS,
    payload
  }
}

export {
  navigationRootAction,
  navigationRootSuccess
}

