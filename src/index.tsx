import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Container } from '@material-ui/core';
import './index.css';
import { AuthGuard } from './auth/AuthGuard';
import { configureStore } from './store';

const queryCache = new QueryCache();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Provider store={store}>
        <Container maxWidth="xl">
          <AuthGuard />
        </Container>
      </Provider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
