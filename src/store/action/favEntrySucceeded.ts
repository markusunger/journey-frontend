import { Action } from 'redux';
import { FAV_ENTRY_SUCCEEDED } from './types';
import { JourneyFile } from '../../lib/types';

export interface FavEntrySucceededAction
  extends Action<typeof FAV_ENTRY_SUCCEEDED> {
  payload: {
    entry: JourneyFile;
  };
}

export const favEntrySucceeded = (
  entry: JourneyFile
): FavEntrySucceededAction => ({
  type: FAV_ENTRY_SUCCEEDED,
  payload: {
    entry,
  },
});
