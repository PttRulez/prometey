import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import networksSlice from './networksSlice';
import accountsSlice from './accountsSlice';
import contractsSlice from './contractsSlice';
import selectListsSlice from './selectListsSlice';
import apiSlice from '../api/apiSlice';
import bobIdsSlice from './bobIdsSlice';

// export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (
//   next
// ) => (action) => {
//   // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
//   console.log('Fignya', action);
//   if (isRejected(action)) {
//     console.log('Rejected');
//   }
//   if (isRejectedWithValue(action)) {
//     console.warn('We got a rejected action!', action);
//   }
//
//   return next(action);
// };

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    auth: authSlice,
    bobIds: bobIdsSlice,
    contracts: contractsSlice,
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
