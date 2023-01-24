import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import networksSlice from './networksSlice';
import accountsSlice from './accountsSlice';
import contractsSlice from './contractsSlice';
import selectListsSlice from './selectListsSlice';
import apiSlice from '../api/apiSlice';
import bobIdsSlice from './bobIdsSlice';
import filtersSlice from './filtersSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    auth: authSlice,
    bobIds: bobIdsSlice,
    contracts: contractsSlice,
    filters: filtersSlice,
    networks: networksSlice,
    notification: notificationSlice,
    selectLists: selectListsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  // .concat(rtkQueryErrorLogger),
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
