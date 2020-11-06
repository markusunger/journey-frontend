import { Action } from 'redux';
import { SET_USER_LOGIN } from './types';

export type SetUserLoginAction = Action<typeof SET_USER_LOGIN>;

export const setUserLogin = (): SetUserLoginAction => ({
  type: SET_USER_LOGIN,
});
