import apiSlice from './apiSlice';
import { Network } from '../types/networks';

export const networksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNetworks: build.query<Network[], void>({
      query: () => '/networks',
      providesTags: ['Networks'],
    }),
  }),
});

export const {
  useGetNetworksQuery,
} = networksApiSlice;
