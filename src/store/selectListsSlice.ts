import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectListsInitialState } from './initialState';
import HelpersService from '../services/HelpersService';

export const fetchNetworksList = createAsyncThunk(
  'selectLists/fetchNetworksList',
  async (_, thunkApi) => {
    try {
      const response = await HelpersService.fetchNetworksList();
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('Список сетей не подтянулся');
    }
  }
);
const selectListsSlice = createSlice({
  name: 'selectLists',
  initialState: selectListsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNetworksList.fulfilled, (state, action) => {
      state.networksList = action.payload;
    });
  },
});

export default selectListsSlice.reducer;
