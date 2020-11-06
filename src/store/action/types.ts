import { LoadEntriesStartAction } from './loadEntriesStart';
import { LoadEntriesSucceededAction } from './loadEntriesSucceeded';
import { LoadEntriesFailedAction } from './loadEntriesFailed';
import { SetUserLoginAction } from './setUserLogin';
import { SetSortKeyAction } from './setSortKey';
import { SetActiveEntryAction } from './setActiveEntry';

export const LOAD_ENTRIES_START = 'journey/entries/load/start';
export const LOAD_ENTRIES_SUCCEEDED = 'journey/entries/load/succeeded';
export const LOAD_ENTRIES_FAILED = 'journey/entries/load/failed';

export const SET_USER_LOGIN = 'journey/login';

export const SET_SORT_KEY = 'journey/setSort';

export const SET_ACTIVE_ENTRY = 'journey/activeEntry';

export type AppActionTypes =
  | LoadEntriesStartAction
  | LoadEntriesSucceededAction
  | LoadEntriesFailedAction
  | SetUserLoginAction
  | SetSortKeyAction
  | SetActiveEntryAction;
