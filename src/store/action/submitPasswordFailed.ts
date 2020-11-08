import { Action } from 'redux';
import { SUBMIT_PASSWORD_FAILED } from './types';

export interface SubmitPasswordFailedAction
  extends Action<typeof SUBMIT_PASSWORD_FAILED> {
  payload: {
    error: Error;
  };
}

export const submitPasswordFailed = (
  error: Error
): SubmitPasswordFailedAction => ({
  type: SUBMIT_PASSWORD_FAILED,
  payload: {
    error,
  },
});
