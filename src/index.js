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
import { Box, CssBaseline } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const redTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000035',
    },
    secondary: {
      main: '#3333ff'
    },
    background: {
      main: '#20008e'
    }
  }
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box sx={{ display: 'flex' }}>
                <App />
              </Box>
              <ToastContainer
                position="bottom-left"
                autoClose={600}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                transition={Slide}
                toastStyle={{ fontSize: '10pt', maxWidth: '230px' }}
              />
            </ThemeProvider>
          </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  // </React.StrictMode>
);