import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashierFilters } from '../types/cashier';
import { filtersInitialState } from './initialState';
import { ReportFilters } from '../types/report';
import { AccountsFilters, TimetableFilters } from '../types/accounts';
import { BobIdFilters } from '../types/bobIds';
import { ProxyFilters } from '../types/proxies';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setAccountsFilters: (state, action: PayloadAction<AccountsFilters>) => {
      state.accounts = action.payload;
    },
    setBobIdFilters: (state, { payload }: PayloadAction<BobIdFilters>) => {
      state.bobIds = payload;
    },
    setCashierFilters: (state, action: PayloadAction<CashierFilters>) => {
      state.cashier = action.payload;
    },
    setProxiesFilters: (state, action: PayloadAction<ProxyFilters>) => {
      state.proxies = action.payload;
    },
    setReportFilters: (state, action: PayloadAction<ReportFilters>) => {
      state.report = action.payload;
    },
    setTimetableFilters: (state, action: PayloadAction<TimetableFilters>) => {
      state.timetable = action.payload;
    },
  },
});

export const {
  setAccountsFilters,
  setBobIdFilters,
  setCashierFilters,
  setTimetableFilters,
  setReportFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
