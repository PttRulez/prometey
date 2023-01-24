import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashierFilters } from '../types/cashier';
import { emptyFiltersState } from './initialState';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: emptyFiltersState,
  reducers: {
    setCashierFilters: (state, action: PayloadAction<CashierFilters>) => {
      state.cashier = action.payload;
    },
  },
});

export default filtersSlice.reducer;
