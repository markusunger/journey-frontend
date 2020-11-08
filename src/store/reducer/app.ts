import { AppState } from '../types';
import { initialAppState } from '../state/app';
import { JourneyFile } from '../../lib/types';
import {
  AppActionTypes,
  LOAD_ENTRIES_SUCCEEDED,
  FAV_ENTRY_SUCCEEDED,
  SET_USER_LOGIN,
  SET_SORT_KEY,
  SET_ACTIVE_ENTRY,
  SUBMIT_UPDATE_SUCCEEDED,
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
    case FAV_ENTRY_SUCCEEDED:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id !== action.payload.entry.id) return entry;
          return {
            ...entry,
            favourite: action.payload.entry.favourite,
          };
        }),
        activeEntry: {
          ...(state.activeEntry as JourneyFile),
          favourite: action.payload.entry.favourite,
        },
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
    case SUBMIT_UPDATE_SUCCEEDED:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id !== action.payload.entry.id) return entry;
          return {
            ...entry,
            updateFromAuthor: action.payload.entry.updateFromAuthor,
          };
        }),
        activeEntry: action.payload.entry,
      };
    default:
      return state;
  }
};
