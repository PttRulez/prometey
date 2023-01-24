import apiSlice from './apiSlice';
import { Cashout } from '../types/cashier';

export const cashoutsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCashout: build.mutation<any, Cashout>({
      query: (body: Cashout) => ({
        url: '/cashouts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cashouts'],
    }),
    updateCashout: build.mutation<any, Cashout>({
      query: (body: Cashout) => ({
        url: `/cashouts${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cashouts'],
    }),
  }),
});

export const {useCreateCashoutMutation, useUpdateCashoutMutation} =  cashoutsApiSlice;
