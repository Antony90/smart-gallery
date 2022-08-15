import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store, rrfProps } from './store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <CssBaseline />
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  // </React.StrictMode>
);