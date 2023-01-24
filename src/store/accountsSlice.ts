import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, AccountsFilters, TimetableFilters } from '../types/accounts';
import AccountsService from '../services/AccountsService';
import { RootState } from './store';
import { accountsInitialState } from './initialState';

export const fetchTimeTable = createAsyncThunk(
  'accounts/fetchTimeTable',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    try {
      const response = await AccountsService.fetchTimetable(
        state.accounts.timeTableFilters
      );
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchTimeTable failed kek');
    }
  }
);

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    try {
      const response = await AccountsService.fetchAccounts(
        state.accounts.accountsFilters
      );

      // response.data.models = response.data.models.map((account: Account) => {
      //   account.network_id = account?.room?.network.id as number;
      //   return account;
      // });
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchAccounts failed kek');
    }
  }
);

export const updateAccount = createAsyncThunk(
  'accounts/update',
  async (account: Account, { getState, rejectWithValue }) => {
    try {
      const response = await AccountsService.updateAccount(account);
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchTimeTable failed kek');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: accountsInitialState,
  reducers: {
    setTimetableFilters: (state, action: PayloadAction<TimetableFilters>) => {
      state.timeTableFilters = action.payload;
    },
    setAccountsFilters: (state, action: PayloadAction<AccountsFilters>) => {
      state.accountsFilters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTimeTable.fulfilled, (state, action) => {
        state.timetable = action.payload;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accountsPage = action.payload;
      });
  },
});

export const { setTimetableFilters } = authSlice.actions;

export default authSlice.reducer;
