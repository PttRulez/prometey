import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ContractService from '../services/ContractService';
import { contractsInitialState } from './initialState';
import { Contract, ContractFromServer } from '../types/contracts';

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
    addContract: (state, { payload: contract }: PayloadAction<Contract>) => {
      state.contracts.push(contract);
      return state;
    },
    updateContract: (
      state,
      { payload: contract }: PayloadAction<ContractFromServer>
    ) => {
      const index = state.contracts.findIndex((c) => c.id === contract.id);
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

export const { addContract, updateContract } = contractsSlice.actions;

export default contractsSlice.reducer;
