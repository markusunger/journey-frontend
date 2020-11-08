import { Action } from 'redux';
import { FAV_ENTRY_START } from './types';

export interface FavEntryStartAction extends Action<typeof FAV_ENTRY_START> {
  payload: {
    entryId: string;
  };
}

export const favEntryStart = (entryId: string): FavEntryStartAction => ({
  type: FAV_ENTRY_START,
  payload: {
    entryId,
  },
});
