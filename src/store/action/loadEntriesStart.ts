import { Action } from 'redux';
import { LOAD_ENTRIES_START } from './types';

export type LoadEntriesStartAction = Action<typeof LOAD_ENTRIES_START>;

export const loadEntriesStart = (): LoadEntriesStartAction => ({
  type: LOAD_ENTRIES_START,
});
