import apiSlice from './apiSlice';
import { CashierFilters } from '../types/cashier';

export const cashierApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCashier: build.query<any, CashierFilters>({
      query: (filters: CashierFilters) => {
        console.log('filters zz', filters);
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
