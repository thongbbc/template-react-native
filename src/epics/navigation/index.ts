import { NAVIGATION_ROOT_WITH_EPIC } from '@constants'
import { mergeMap, map } from 'rxjs/operators'
import { ofType, Epic } from 'redux-observable';
import { PayloadNavigationRoot, navigationRootSuccess } from '@actions/navigation';
import { RootState } from '@reducers';
import { PayloadAction } from 'src/types/types';
import { of } from 'rxjs';

const navigationRootEpic: Epic<PayloadAction<string, PayloadNavigationRoot>, any, RootState> = (action$: any) => action$.pipe(
  ofType(NAVIGATION_ROOT_WITH_EPIC),
  map((action: PayloadAction<string, PayloadNavigationRoot>) => {
    return navigationRootSuccess(action.payload);
  })
)

export default navigationRootEpic