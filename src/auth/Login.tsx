import React, { ChangeEvent, useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { useMutation } from 'react-query';
import { PostTypes, postData } from '../lib/fetchData';
import { setUserLogin } from '../store/action';

import './Login.css';

export const Login = connect()(
  (props: DispatchProp): JSX.Element => {
    const [passwordInput, setPasswordInput] = useState('');
    const [mutate, { isLoading }] = useMutation(() =>
      postData(PostTypes.login, { password: passwordInput })
    );

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
    };

    const handleLogin = () => {
      mutate().then(response => {
        if (response && response.login) {
          props.dispatch(setUserLogin());
        }
      });
    };

    return (
      <>
        <h1>Login</h1>
        <div>Bitte mit Passwort einloggen:</div>
        <div className="login-form-container">
          <TextField
            variant="filled"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <Button color="primary" disabled={isLoading} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </>
    );
  }
);
