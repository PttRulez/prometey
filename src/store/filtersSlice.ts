import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashierFilters } from '../types/cashier';
import { emptyFiltersState } from './initialState';
import { ReportFilters } from '../types/report';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: emptyFiltersState,
  reducers: {
    setCashierFilters: (state, action: PayloadAction<CashierFilters>) => {
      state.cashier = action.payload;
    },
    setReportFilters: (state, action: PayloadAction<ReportFilters>) => {
      state.report = action.payload;
    },
  },
});

export const { setCashierFilters, setReportFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
