import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.bearerToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export default baseQuery;
