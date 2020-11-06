import React from 'react';
import { connect } from 'react-redux';
import { Login } from './Login';
import { App } from '../App';
import { AppState } from '../store/types';

interface AuthGuardProps {
  isLoggedIn: boolean;
}

export const AuthGuard = connect((state: AppState) => ({
  isLoggedIn: state.isLoggedIn,
}))(
  (props: AuthGuardProps): JSX.Element => {
    if (props.isLoggedIn) {
      return <App />;
    } else {
      return <Login />;
    }
  }
);
