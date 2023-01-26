import apiSlice from './apiSlice';
import { Deposit } from '../types/cashier';

export const depositsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createDeposit: build.mutation<any, Deposit>({
      query: (body: Deposit) => ({
        url: '/deposits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deposits', 'Cashier'],
    }),
    updateDeposit: build.mutation<any, Deposit>({
      query: (body: Deposit) => ({
        url: `/deposits/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Deposits', 'Cashier'],
    }),
  }),
});

export const {useCreateDepositMutation, useUpdateDepositMutation} =  depositsApiSlice;
