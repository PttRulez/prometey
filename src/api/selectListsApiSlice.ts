import apiSlice from './apiSlice';
import { SelectList } from '../types/common';

export const selectListsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNetworkList: build.query<SelectList, void>({
      query: () => '/get-network-list',
      providesTags: ['NetworkList'],
    }),
    getProfilesLists: build.query<any, void>({
      query: () => '/profiles/get-all-lists',
      providesTags: ['ProfilesSelectList'],
    }),
    getProxiesList: build.query<any, { room_id: number; account_id: number }>({
      query: (params) => ({
        url: '/get-proxies-for-room',
        params,
      }),
      providesTags: ['ProxiesList'],
    }),
  }),
});

export const {
  useLazyGetProxiesListQuery,
  useGetProfilesListsQuery,
    useGetNetworkListQuery
} = selectListsApiSlice;
