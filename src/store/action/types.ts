import { LoadEntriesStartAction } from './loadEntriesStart';
import { LoadEntriesSucceededAction } from './loadEntriesSucceeded';
import { LoadEntriesFailedAction } from './loadEntriesFailed';
import { FavEntryStartAction } from './favEntryStart';
import { FavEntrySucceededAction } from './favEntrySucceeded';
import { FavEntryFailedAction } from './favEntryFailed';
import { SubmitUpdateStartAction } from './submitUpdateStart';
import { SubmitUpdateSucceededAction } from './submitUpdateSucceeded';
import { SubmitUpdateFailedAction } from './submitUpdateFailed';
import { SetUserLoginAction } from './setUserLogin';
import { SetSortKeyAction } from './setSortKey';
import { SetActiveEntryAction } from './setActiveEntry';

export const SUBMIT_PASSWORD_START = 'journey/submitPassword/start';
export const SUBMIT_PASSWORD_FAILED = 'journey/submitPassword/failed';

export const LOAD_ENTRIES_START = 'journey/entries/load/start';
export const LOAD_ENTRIES_SUCCEEDED = 'journey/entries/load/succeeded';
export const LOAD_ENTRIES_FAILED = 'journey/entries/load/failed';

export const FAV_ENTRY_START = 'journey/entry/fav/start';
export const FAV_ENTRY_SUCCEEDED = 'journey/entry/fav/succeeded';
export const FAV_ENTRY_FAILED = 'journey/entry/fav/failed';

export const SUBMIT_UPDATE_START = 'journey/entry/submitUpdate/start';
export const SUBMIT_UPDATE_SUCCEEDED = 'journey/entry/submitUpdate/succeeded';
export const SUBMIT_UPDATE_FAILED = 'journey/entry/submitUpdate/failed';

export const SET_USER_LOGIN = 'journey/login';

export const SET_SORT_KEY = 'journey/setSort';

export const SET_ACTIVE_ENTRY = 'journey/activeEntry';

export type AppActionTypes =
  | LoadEntriesStartAction
  | LoadEntriesSucceededAction
  | LoadEntriesFailedAction
  | SubmitUpdateStartAction
  | SubmitUpdateSucceededAction
  | SubmitUpdateFailedAction
  | FavEntryStartAction
  | FavEntrySucceededAction
  | FavEntryFailedAction
  | SetUserLoginAction
  | SetSortKeyAction
  | SetActiveEntryAction;
