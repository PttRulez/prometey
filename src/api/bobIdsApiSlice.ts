import apiSlice from './apiSlice';
import { BobId, BobIdFilters, BobIdFromServer } from '../types/bobIds';
import { SelectList } from '../types/common';

export const bobIdsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBobIds: build.query<
      { bobIds: BobIdFromServer[]; networkList: SelectList },
      BobIdFilters
    >({
      query: (filters) => {
        return {
          url: '/bob-ids',
          method: 'GET',
          params: { filters: JSON.stringify(filters) },
        };
      },
      providesTags: ['BobIds'],
    }),
    addBobId: build.mutation<BobIdFromServer, BobId>({
      query: (body: BobId) => ({
        url: '/bob-ids',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BobIds'],
    }),
    updateBobId: build.mutation<BobIdFromServer, BobId>({
      query: (body: BobId) => ({
        url: `/bob-ids/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['BobIds'],
    }),
  }),
});

export const {
  useGetBobIdsQuery,
  useLazyGetBobIdsQuery,
  useAddBobIdMutation,
  useUpdateBobIdMutation,
} = bobIdsApiSlice;
