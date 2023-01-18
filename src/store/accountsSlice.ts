import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AccountsService, { TimetableFilters } from '../services/AccountsService';
import { AccountsSliceInitialState } from '../types/slices/AccountsSliceTypes';

const initialState: AccountsSliceInitialState = {
  timetable: null,
};

export const fetchTimeTable = createAsyncThunk(
  'timetable/getTimeTable',
  async (filters: TimetableFilters, { rejectWithValue }) => {
    try {
      const response = await AccountsService.fetchTimetable(filters);
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchTimeTable failed kek');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTimeTable.fulfilled, (state, action) => {
      state.timetable = action.payload;
    });
  },
});

export default authSlice.reducer;
