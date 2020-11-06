import { Action } from 'redux';
import { JourneyFile } from '../../lib/types';
import { SET_ACTIVE_ENTRY } from './types';

export interface SetActiveEntryAction extends Action<typeof SET_ACTIVE_ENTRY> {
  payload: {
    entry: JourneyFile;
  };
}

export const setActiveEntry = (entry: JourneyFile): SetActiveEntryAction => ({
  type: SET_ACTIVE_ENTRY,
  payload: {
    entry,
  },
});
