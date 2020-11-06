import React, { useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
} from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { JourneyFile, EntrySortKeys } from '../lib/types';
import { AppState } from '../store/types';
import { setSortKey, setActiveEntry } from '../store/action';
import { formatAuthor, formatDate } from './utils';

import './EntryList.css';

interface EntryListProps {
  entries: JourneyFile[];
}

/*
  TODO: Change from Material UI table to react-virtualized table to improve performance
 */

export const EntryList = connect((state: AppState) => ({
  entries: state.entries,
}))(
  (props: EntryListProps & DispatchProp): JSX.Element => {
    const [sortedBy, setSortedBy] = useState<EntrySortKeys | ''>('');
    const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

    if (!props.entries || props.entries.length === 0) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    const handleSort = (key: EntrySortKeys) => {
      setSortedBy(key);
      props.dispatch(setSortKey(key));
    };

    const isSortedBy = (col: 'author' | 'date' | 'fav'): boolean => {
      return /$col^/.test(sortedBy);
    };

    const getSortDirection = (): 'asc' | 'desc' => {
      if (sortedBy === '') return 'asc';
      return sortedBy.endsWith('ascending') ? 'asc' : 'desc';
    };

    const handleEntrySelect = (entry: JourneyFile) => {
      setSelectedEntry(entry.id);
      props.dispatch(setActiveEntry(entry));
    };

    return (
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="Journey entry table">
            <TableHead className="table-header">
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell
                  onClick={() =>
                    handleSort(
                      sortedBy === EntrySortKeys.AUTHOR_DESC
                        ? EntrySortKeys.AUTHOR_ASC
                        : EntrySortKeys.AUTHOR_DESC
                    )
                  }
                  sortDirection={
                    isSortedBy('author') ? getSortDirection() : 'asc'
                  }
                >
                  <TableSortLabel
                    active={isSortedBy('author')}
                    direction={
                      isSortedBy('author') ? getSortDirection() : 'asc'
                    }
                  >
                    Autor
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleSort(
                      sortedBy === EntrySortKeys.DATE_DESC
                        ? EntrySortKeys.DATE_ASC
                        : EntrySortKeys.DATE_DESC
                    )
                  }
                  sortDirection={
                    isSortedBy('date') ? getSortDirection() : 'asc'
                  }
                >
                  <TableSortLabel
                    active={isSortedBy('date')}
                    direction={isSortedBy('date') ? getSortDirection() : 'asc'}
                  >
                    Datum
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() =>
                    handleSort(
                      sortedBy === EntrySortKeys.FAV_ASC
                        ? EntrySortKeys.FAV_DESC
                        : EntrySortKeys.FAV_ASC
                    )
                  }
                  sortDirection={isSortedBy('fav') ? getSortDirection() : 'asc'}
                >
                  <TableSortLabel
                    active={isSortedBy('fav')}
                    direction={isSortedBy('fav') ? getSortDirection() : 'asc'}
                  >
                    Markiert
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.entries.map((entry: JourneyFile, idx) => (
                <TableRow
                  key={idx}
                  hover
                  onClick={() => handleEntrySelect(entry)}
                  selected={entry.id === selectedEntry}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{formatAuthor(entry.tags)}</TableCell>
                  <TableCell>{formatDate(entry.date_journal)}</TableCell>
                  <TableCell align="center">
                    {entry.favourite && (
                      <ThumbUp color="primary" fontSize="small" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
);
