import apiSlice from './apiSlice';
import { Network } from '../types/networks';

export const networksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNetworks: build.query<Network[], void>({
      query: () => '/networks',
      providesTags: ['Networks'],
    }),
    toggleTimetable: build.mutation<any, number>({
      query: (id) => ({
        url: `/networks/toggle-timetable/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Networks', 'Timetable'],
    }),
  }),
});

export const {
  useGetNetworksQuery,
  useToggleTimetableMutation
} = networksApiSlice;
