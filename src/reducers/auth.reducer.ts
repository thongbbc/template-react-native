import { RESET_ALL_STATE } from 'constants';

export interface AuthState {

}

const defaultState = {

}
export default function authReducer(state: AuthState = defaultState, action: any) {
  switch (action.type) {
    case RESET_ALL_STATE: return defaultState;

    default: return state;
  }
}