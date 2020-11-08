import { Action } from 'redux';
import { SUBMIT_PASSWORD_START } from './types';

export interface SubmitPasswordStartAction
  extends Action<typeof SUBMIT_PASSWORD_START> {
  payload: {
    password: string;
  };
}

export const submitPasswordStart = (
  password: string
): SubmitPasswordStartAction => ({
  type: SUBMIT_PASSWORD_START,
  payload: {
    password,
  },
});
