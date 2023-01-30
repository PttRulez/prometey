import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import apiSlice from '../api/apiSlice';
import filtersSlice from './filtersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    filters: filtersSlice,
    notification: notificationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
