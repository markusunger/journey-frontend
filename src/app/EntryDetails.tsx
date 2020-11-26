import React, { useState, useEffect, ChangeEvent } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Paper, TextField } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  ThumbUp,
  ThumbUpOutlined,
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons';
import ModalImage from 'react-modal-image';
import { useAwaitAction } from 'redux-await-action';
import { JourneyFile, CopyLinks } from '../lib/types';
import {
  favEntryStart,
  submitUpdateStart,
  SUBMIT_UPDATE_SUCCEEDED,
  SUBMIT_UPDATE_FAILED,
} from '../store/action';
import { AppState } from '../store/types';
import { getMoodEmoji, getWeatherString, formatDateToClipboard } from './utils';

import './EntryDetails.css';

interface EntryDetailsProps {
  entry?: JourneyFile;
}

export const EntryDetails = connect((state: AppState) => ({
  entry: state.activeEntry,
}))(
  (props: EntryDetailsProps & DispatchProp): JSX.Element => {
    const awaitAction = useAwaitAction();
    const [showUpdate, setShowUpdate] = useState(
      !!props.entry?.updateFromAuthor
    );
    const [updateText, setUpdateText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dateCopyVisible, setDateCopyVisible] = useState(false);
    const [textCopyVisible, setTextCopyVisible] = useState(false);

    useEffect(() => {
      setUpdateText(props.entry?.updateFromAuthor || '');
      setShowUpdate(!!props.entry?.updateFromAuthor);
    }, [props.entry]);

    if (!props.entry) {
      return (
        <Paper elevation={3}>
          <div className="paper-content">Eintrag auswählen!</div>
        </Paper>
      );
    }

    const weatherString = getWeatherString(props.entry.weather);

    const handleFavClick = () => {
      props.dispatch(favEntryStart((props.entry as JourneyFile).id));
    };

    const handleUpdateClick = async () => {
      setIsSubmitting(true);
      props.dispatch(
        submitUpdateStart((props.entry as JourneyFile).id, updateText)
      );
      try {
        await awaitAction(SUBMIT_UPDATE_SUCCEEDED, SUBMIT_UPDATE_FAILED);
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
      }
    };

    const handleCopyHover = (type: CopyLinks, show: boolean) => {
      switch (type) {
        case CopyLinks.DATE:
          setDateCopyVisible(show);
          break;
        case CopyLinks.TEXT:
          setTextCopyVisible(show);
          break;
        default:
          break;
      }
    }

    const handleCopy = async (type: CopyLinks) => {
      const copyToClipboard = async (text: string): Promise<void> => navigator.clipboard.writeText(text);
  
      switch (type) {
        case CopyLinks.DATE:
          await copyToClipboard(formatDateToClipboard(new Intl.DateTimeFormat('de-DE', {
            weekday: 'long',
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(props.entry?.date_journal as number))) as string);
          break;
        case CopyLinks.TEXT:
          await copyToClipboard(props.entry?.text || '');
          break;
        default:
          break;
      }
    }

    return (
      <>
        <Paper elevation={3}>
          <div className="paper-content">
            <div className="flex-container">
              <div className="flex-container-item">
                <img
                  alt={props.entry.tags[0]}
                  src={`/${props.entry.tags[0]}.jpg`}
                  className="avatar"
                />
              </div>
              <div className="flex-container flex-container-col flex-container-item flex-container-item-main">
                <div className="date" onMouseOver={():void => handleCopyHover(CopyLinks.DATE, true)} onMouseOut={():void => handleCopyHover(CopyLinks.DATE, false)}>
                  <div>
                      {new Intl.DateTimeFormat('de-DE', {
                      weekday: 'long',
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(props.entry.date_journal))}
                  </div>
                  <div className={dateCopyVisible ? 'visible' : 'hidden'}>
                    <AssignmentIcon onClick={(): Promise<void> => handleCopy(CopyLinks.DATE)} />
                  </div>
                </div>
                <p className="info">
                  Ort:{' '}
                  <span className="info-content">
                    {props.entry.address
                      ? props.entry.address
                      : '- keine Angabe -'}
                  </span>
                </p>
                <p className="info">
                  Stimmung:{' '}
                  <span className="info-content">
                    {getMoodEmoji(props.entry.sentiment)}{' '}
                  </span>
                  {weatherString && (
                    <>
                      | Wetter:{' '}
                      <span className="info-content">{weatherString}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex-container-item flex-container-self-bottom">
                <Button
                  variant="contained"
                  color={props.entry.favourite ? 'primary' : 'default'}
                  startIcon={
                    props.entry.favourite ? <ThumbUp /> : <ThumbUpOutlined />
                  }
                  onClick={handleFavClick}
                >
                  {props.entry.favourite ? 'Abwählen' : 'Markieren'}
                </Button>
              </div>
            </div>
            <div onMouseOver={():void => handleCopyHover(CopyLinks.TEXT, true)} onMouseOut={():void => handleCopyHover(CopyLinks.TEXT, false)}>
              <div
                className="entry-container"
                dangerouslySetInnerHTML={{ __html: props.entry.text }}
              />
              <div className={textCopyVisible ? 'visible' : 'hidden'}>
                    <AssignmentIcon onClick={(): Promise<void> => handleCopy(CopyLinks.TEXT)} />
                  </div>
            </div>
            {props.entry.photos.length > 0 && (
              <div className="photo-container">
                {props.entry.photos.map((photo, idx) => (
                  <ModalImage
                    key={idx}
                    alt={`Foto Nr. ${idx + 1} von ${
                      (props.entry as JourneyFile).photos.length
                    }`}
                    small={`images/${photo}`}
                    large={`images/${photo}`}
                    className="photo-preview"
                  />
                ))}
              </div>
            )}
          </div>
        </Paper>

        <div className="update-button-container">
          <Button
            startIcon={showUpdate ? <ArrowUpward /> : <ArrowDownward />}
            onClick={() => setShowUpdate(current => !current)}
          >
            {showUpdate ? 'Update Einklappen' : 'Update Ausklappen'}
          </Button>
        </div>
        {showUpdate && (
          <Paper>
            <div className="paper-content">
              <TextField
                multiline
                fullWidth
                label="Update aus heutiger Sicht"
                value={updateText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateText(e.target.value)
                }
              />
              <Button
                color="primary"
                fullWidth
                disabled={updateText.length === 0 || isSubmitting}
                onClick={handleUpdateClick}
              >
                Abschicken
              </Button>
            </div>
          </Paper>
        )}
      </>
    );
  }
);
