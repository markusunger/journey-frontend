import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  createAwaitMiddleware,
  StoreAwaitEventEmitter,
} from 'redux-await-action';
import { appReducer } from './reducer/app';
import { initialAppState } from './state/app';

import {
  loadEntriesStartEpic,
  submitPasswordStartEpic,
  favEntryStartEpic,
  submitUpdateStartEpic,
} from './epic';

const rootEpic = combineEpics(
  loadEntriesStartEpic,
  submitPasswordStartEpic,
  favEntryStartEpic,
  submitUpdateStartEpic
);
const epicMiddleware = createEpicMiddleware();

export const awaitEmitter = new StoreAwaitEventEmitter();
const storeAwaitMiddleware = createAwaitMiddleware(awaitEmitter);

export const configureStore = () => {
  const store = createStore(
    appReducer,
    initialAppState,
    composeWithDevTools(applyMiddleware(epicMiddleware, storeAwaitMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
};
