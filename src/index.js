import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store, rrfProps } from './store/store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const blueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f83030',
    },
    background: {
      paper: '#0A1929',
      light: '#f82038',
      dark: '#f82038',
    }
  }
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <ThemeProvider theme={blueTheme}>
              <Box sx={{ display: 'flex' }}>
                <App />
              </Box>
              <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
              />
            </ThemeProvider>
          </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  // </React.StrictMode>
);