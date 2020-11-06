import React, { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { loadEntriesStart } from './store/action';
import { EntryList } from './app/EntryList';
import { EntryDetails } from './app/EntryDetails';

import './App.css';

export const App = connect()((props: DispatchProp) => {
  const { dispatch } = props;
  useEffect(() => {
    dispatch(loadEntriesStart());
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="entry-list-container">
        <EntryList />
      </div>
      <div className="entry-details-container">
        <EntryDetails />
      </div>
    </div>
  );
});
