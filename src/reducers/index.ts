import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";
import navigationReducer from "./navigation.reducer";
import { PayloadNavigationRoot } from "src/actions/navigation";

export interface RootState {
  auth: AuthState
  navigation: PayloadNavigationRoot,
}

const rootState = {
  auth: authReducer,
  navigation: navigationReducer,
}
const rootReducer = combineReducers(rootState);
export default rootReducer;