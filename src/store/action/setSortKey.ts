import { Action } from 'redux';
import { EntrySortKeys } from '../../lib/types';
import { SET_SORT_KEY } from './types';

export interface SetSortKeyAction extends Action<typeof SET_SORT_KEY> {
  payload: {
    key: EntrySortKeys;
  };
}

export const setSortKey = (key: EntrySortKeys): SetSortKeyAction => ({
  type: SET_SORT_KEY,
  payload: {
    key,
  },
});
