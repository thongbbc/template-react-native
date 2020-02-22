export interface AuthState {

}

const defaultState = {

}
export default function authReducer(state: AuthState = defaultState, action: any) {
  switch (action.type) {
    default: return state;
  }
}