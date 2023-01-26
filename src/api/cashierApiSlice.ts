import apiSlice from './apiSlice';
import { CashierFilters } from '../types/cashier';

export const cashierApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCashier: build.query<any, CashierFilters>({
      query: (filters: CashierFilters) => {
        return {
          url: '/cashier',
          method: 'POST',
          body: { params: { filters } },
        };
      },
      providesTags: ['Cashier'],
    }),
  }),
});

export const { useGetCashierQuery } =  cashierApiSlice;
