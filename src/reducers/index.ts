import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";
import navigationReducer from "./navigation.reducer";
import { NavigationState } from "@actions/navigation.action";

export interface RootState {
  auth: AuthState
  navigation: NavigationState,
}

const rootState = {
  auth: authReducer,
  navigation: navigationReducer,
}
const rootReducer = combineReducers(rootState);
export default rootReducer;