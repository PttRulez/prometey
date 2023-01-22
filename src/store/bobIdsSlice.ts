import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bobIdsInitialState } from './initialState';
import { BobIdFilters } from '../types/bobIds';

const bobIdsSlice = createSlice({
  name: 'bobIds',
  initialState: bobIdsInitialState,
  reducers: {
    setBobIdFilters: (state, { payload }: PayloadAction<BobIdFilters>) => {
      state.filters = payload;
      return state;
    },
  },
});

export const { setBobIdFilters } = bobIdsSlice.actions;

export default bobIdsSlice.reducer;
