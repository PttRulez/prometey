import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import ContractService from '../services/ContractService';
import { contractsInitialState } from './initialState';
import { Contract } from '../types/contracts';

export const fetchContracts = createAsyncThunk(
  'contracts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ContractService.fetchContracts();
      return response.data;
    } catch (err) {
      rejectWithValue('Failed fetching Contracts');
    }
  }
);

const contractsSlice = createSlice({
  name: 'contracts',
  initialState: contractsInitialState,
  reducers: {
    updateContract: (state, { payload: contract }: PayloadAction<Contract>) => {
      const index = state.contracts.findIndex((c) => c.id === contract.id);
      console.log('index', index, state.contracts[index]);
      console.log('contracts state', current(state));
      if (index >= 0) {
        state.contracts[index] = { ...state.contracts[index], ...contract };
      }
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (state, action) => {
      state.contracts = action.payload ?? [];
    });
  },
});

export const { updateContract } = contractsSlice.actions;

export default contractsSlice.reducer;
