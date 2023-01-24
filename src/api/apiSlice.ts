import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store/store';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.bearerToken;
      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    'Accounts',
    'BobIds',
    'Cashier',
    'Cashouts',
    'Contracts',
    'Deposits',
    'Profiles',
    'ProfilesSelectList',
    'ProxiesList',
    'preparedAccountFormData',
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
