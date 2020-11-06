import { JourneyFile, EntrySortKeys } from '../../lib/types';

export const sortEntries = (
  entries: JourneyFile[],
  key: EntrySortKeys
): JourneyFile[] => {
  switch (key) {
    case EntrySortKeys.AUTHOR_ASC:
      return entries.sort((a, b) => {
        if (a.tags[0][0] === b.tags[0][0]) return 0;
        if (a.tags[0][0] > b.tags[0][0]) return -1;
        return 1;
      });
    case EntrySortKeys.AUTHOR_DESC:
      return entries.sort((a, b) => {
        if (a.tags[0][0] === b.tags[0][0]) return 0;
        if (a.tags[0][0] < b.tags[0][0]) return -1;
        return 1;
      });
    case EntrySortKeys.DATE_ASC:
      return entries.sort((a, b) => {
        if (a.date_journal === b.date_journal) return 0;
        if (a.date_journal < b.date_journal) return -1;
        return 1;
      });
    case EntrySortKeys.DATE_DESC:
      return entries.sort((a, b) => {
        if (a.date_journal === b.date_journal) return 0;
        if (a.date_journal > b.date_journal) return -1;
        return 1;
      });
    case EntrySortKeys.FAV_ASC:
      return entries.sort((a, b) => {
        if (a.favourite && b.favourite) return 0;
        if (a.favourite && !b.favourite) return -1;
        return 1;
      });
    case EntrySortKeys.FAV_DESC:
      return entries.sort((a, b) => {
        if (a.favourite && b.favourite) return 0;
        if (!a.favourite && b.favourite) return -1;
        return 1;
      });
    default:
      return entries;
  }
};
