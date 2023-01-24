import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRouter from './router/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AppRouter />
    </LocalizationProvider>
  </Provider>
  // </React.StrictMode>
);
