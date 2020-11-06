import { AppState } from '../types';
import { initialAppState } from '../state/app';
import {
  AppActionTypes,
  LOAD_ENTRIES_SUCCEEDED,
  SET_USER_LOGIN,
  SET_SORT_KEY,
  SET_ACTIVE_ENTRY,
} from '../action/types';
import { sortEntries } from '../utils/sortEntries';

export const appReducer = (
  state = initialAppState,
  action: AppActionTypes
): AppState => {
  switch (action.type) {
    case LOAD_ENTRIES_SUCCEEDED:
      return {
        ...state,
        entries: action.payload.entries,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SET_SORT_KEY:
      return {
        ...state,
        entries: sortEntries(state.entries, action.payload.key),
      };
    case SET_ACTIVE_ENTRY:
      return {
        ...state,
        activeEntry: action.payload.entry,
      };
    default:
      return state;
  }
};
