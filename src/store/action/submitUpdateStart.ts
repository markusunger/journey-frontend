import { Action } from 'redux';
import { SUBMIT_UPDATE_START } from './types';

export interface SubmitUpdateStartAction
  extends Action<typeof SUBMIT_UPDATE_START> {
  payload: {
    entryId: string;
    text: string;
  };
}

export const submitUpdateStart = (
  entryId: string,
  text: string
): SubmitUpdateStartAction => ({
  type: SUBMIT_UPDATE_START,
  payload: {
    entryId,
    text,
  },
});
