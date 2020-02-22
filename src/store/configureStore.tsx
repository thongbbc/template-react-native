import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from '@reducers'
import { rootEpic } from '@epics'
import { createEpicMiddleware } from 'redux-observable'
const epicMiddleware = createEpicMiddleware();
const store = function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware))
  return store
}();
epicMiddleware.run(rootEpic)

export function reduxProvider(Component: any) {
  return (props: any) => (
    <Provider store={store} >
      <Component {...props} />
    </Provider>
  );
}
export {
  store
};

