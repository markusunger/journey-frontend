import React, { ChangeEvent, useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { useAwaitAction } from 'redux-await-action';
import { TextField, Button, Grid } from '@material-ui/core';
import { submitPasswordStart } from '../store/action';
import { SET_USER_LOGIN, SUBMIT_PASSWORD_FAILED } from '../store/action/types';

import './Login.css';

export const Login = connect()(
  (props: DispatchProp): JSX.Element => {
    const [passwordInput, setPasswordInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const awaitAction = useAwaitAction();

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
    };

    const handleLogin = async () => {
      setIsLoading(true);
      props.dispatch(submitPasswordStart(passwordInput));
      try {
        await awaitAction(SET_USER_LOGIN, SUBMIT_PASSWORD_FAILED);
      } catch (_) {
        setIsLoading(false);
      }
    };

    return (
      <div className="login-container">
        <div>
          <div className="login-form-container">
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  variant="filled"
                  label="Passwort"
                  type="password"
                  value={passwordInput}
                  onChange={handlePasswordChange}
                  size="small"
                  onKeyPress={event => {
                    if (event.key === 'Enter') handleLogin();
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={handleLogin}
                  variant="outlined"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
);
