import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import networksSlice from './networksSlice';
import timetableSlice from './accountsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    networks: networksSlice,
    timetable: timetableSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
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
