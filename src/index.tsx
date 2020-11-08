import React from 'react';
import { Provider } from 'react-redux';
import { StoreAwaitProvider } from 'redux-await-action';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import './index.css';
import { AuthGuard } from './auth/AuthGuard';
import { configureStore, awaitEmitter } from './store';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e98e59',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StoreAwaitProvider emitter={awaitEmitter}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <AuthGuard />
          </ThemeProvider>
        </CssBaseline>
      </StoreAwaitProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
