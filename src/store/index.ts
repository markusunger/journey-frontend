import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { appReducer } from './reducer/app';
import { initialAppState } from './state/app';

import { loadEntriesStartEpic } from './epic';

const rootEpic = combineEpics(loadEntriesStartEpic);
const epicMiddleware = createEpicMiddleware();

export const configureStore = () => {
  const store = createStore(
    appReducer,
    initialAppState,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
};
