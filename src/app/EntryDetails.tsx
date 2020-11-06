import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Paper, List, ListItem, Divider } from '@material-ui/core';
import { JourneyFile } from '../lib/types';
import { AppState } from '../store/types';

import './EntryDetails.css';

interface EntryDetailsProps {
  entry?: JourneyFile;
}

export const EntryDetails = connect((state: AppState) => ({
  entry: state.activeEntry,
}))(
  (props: EntryDetailsProps): JSX.Element => {
    if (!props.entry) {
      return (
        <Paper elevation={3}>
          <div className="paper-content">Eintrag auswählen!</div>
        </Paper>
      );
    }

    return (
      <Paper elevation={3}>
        <div className="paper-content">
          <div className="flex-container">
            <div className="flex-container-item">
              <Avatar
                alt={props.entry.tags[0]}
                src={`/${props.entry.tags[0]}.jpg`}
                className="avatar"
              />
            </div>
            <div className="flex-container flex-container-col flex-container-item">
              <p className="date">
                {new Intl.DateTimeFormat('de-DE', {
                  weekday: 'long',
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(props.entry.date_journal))}
              </p>
              <p className="info">
                Ort:{' '}
                <span className="info-content">
                  {props.entry.address
                    ? props.entry.address
                    : '- keine Angabe -'}
                </span>
              </p>
              <p className="info">Mood: {props.entry.sentiment}</p>
            </div>
          </div>
          <div
            className="entry-container"
            dangerouslySetInnerHTML={{ __html: props.entry.text }}
          />
        </div>
      </Paper>
    );
  }
);
