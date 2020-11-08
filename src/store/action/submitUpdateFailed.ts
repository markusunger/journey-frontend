import { Action } from 'redux';
import { SUBMIT_UPDATE_FAILED } from './types';

export interface SubmitUpdateFailedAction
  extends Action<typeof SUBMIT_UPDATE_FAILED> {
  payload: {
    error: Error;
  };
}

export const submitUpdateFailed = (error: Error): SubmitUpdateFailedAction => ({
  type: SUBMIT_UPDATE_FAILED,
  payload: {
    error,
  },
});
