import { Action } from 'redux';
import { LOAD_ENTRIES_SUCCEEDED } from './types';
import { JourneyFile } from '../../lib/types';

export interface LoadEntriesSucceededAction
  extends Action<typeof LOAD_ENTRIES_SUCCEEDED> {
  payload: {
    entries: JourneyFile[];
  };
}

export const loadEntriesSucceeded = (
  entries: JourneyFile[]
): LoadEntriesSucceededAction => ({
  type: LOAD_ENTRIES_SUCCEEDED,
  payload: {
    entries,
  },
});
