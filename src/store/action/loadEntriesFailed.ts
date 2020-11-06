import { Action } from 'redux';
import { LOAD_ENTRIES_FAILED } from './types';

export interface LoadEntriesFailedAction
  extends Action<typeof LOAD_ENTRIES_FAILED> {
  payload: {
    error: Error;
  };
}

export const loadEntriesFailed = (error: Error): LoadEntriesFailedAction => ({
  type: LOAD_ENTRIES_FAILED,
  payload: {
    error,
  },
});
