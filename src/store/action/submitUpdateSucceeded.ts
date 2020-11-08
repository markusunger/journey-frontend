import { Action } from 'redux';
import { JourneyFile } from '../../lib/types';
import { SUBMIT_UPDATE_SUCCEEDED } from './types';

export interface SubmitUpdateSucceededAction
  extends Action<typeof SUBMIT_UPDATE_SUCCEEDED> {
  payload: {
    entry: JourneyFile;
  };
}

export const submitUpdateSucceeded = (
  entry: JourneyFile
): SubmitUpdateSucceededAction => ({
  type: SUBMIT_UPDATE_SUCCEEDED,
  payload: {
    entry,
  },
});
