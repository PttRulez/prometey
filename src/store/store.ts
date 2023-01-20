import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import networksSlice from './networksSlice';
import accountsSlice from './accountsSlice';
import contractsSlice from './contractsSlice';
import selectListsSlice from './selectListsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    auth: authSlice,
    contracts: contractsSlice,
    networks: networksSlice,
    notification: notificationSlice,
    selectLists: selectListsSlice,
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
