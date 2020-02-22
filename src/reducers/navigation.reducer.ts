import { PayloadNavigationRoot } from '../actions/navigation';
import { NAVIGATION_ROOT_SUCCESS } from '@constants';
import { PayloadAction } from 'src/types/types';

const defaultState: PayloadNavigationRoot = {
  name: ''
}

export default function navigationReducer(
  state: PayloadNavigationRoot = defaultState,
  action: PayloadAction<string, PayloadNavigationRoot>
): PayloadNavigationRoot {
  switch (action.type) {
    case NAVIGATION_ROOT_SUCCESS: {
      return action.payload;
    };
    default: return state;
  }
}