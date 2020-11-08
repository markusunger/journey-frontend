import { Action } from 'redux';
import { FAV_ENTRY_FAILED } from './types';

export interface FavEntryFailedAction extends Action<typeof FAV_ENTRY_FAILED> {
  payload: {
    error: Error;
  };
}

export const favEntryFailed = (error: Error): FavEntryFailedAction => ({
  type: FAV_ENTRY_FAILED,
  payload: {
    error,
  },
});
