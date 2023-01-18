import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkService from '../services/NetworkService';
import { Network } from '../types/models';
import { NetworkState } from '../types/slices/NetworkSliceTypes';

const initialState: NetworkState = {
  network: {} as Network,
  networkList: [],
  networkListLoading: false,
};

export const fetchNetworks = createAsyncThunk(
  'networks/fetchAllNetworks',
  async function (_, { rejectWithValue }) {
    try {
      const response = await NetworkService.fetchNetworks();
      return response.data;
    } catch (err) {
      rejectWithValue('Failed Networks');
    }
  }
);

export const fetchSingleNetwork = createAsyncThunk(
  'networks/fetchSingleNetwork',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await NetworkService.fetchSingleNetwork(id);
      return response.data;
    } catch (err) {
      rejectWithValue('Failed Networks');
    }
  }
);

const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNetworks.fulfilled, function (state, action) {
        state.networkList = action.payload ?? [];
      })
      .addCase(fetchSingleNetwork.fulfilled, function (state, action) {
        state.network = action.payload!;
      });
  },
});

export default networkSlice.reducer;
