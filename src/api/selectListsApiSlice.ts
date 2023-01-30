import apiSlice from './apiSlice';
import { SelectList } from '../types/common';

export const selectListsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBrainList: build.query<SelectList, void>({
      query: () => '/get-brains-list',
    }),
    getNetworkList: build.query<SelectList, void>({
      query: () => '/get-network-list',
      providesTags: ['NetworkList'],
    }),
    getProfilesLists: build.query<any, void>({
      query: () => '/profiles/get-all-lists',
      providesTags: ['ProfilesSelectList'],
    }),
    getTimetableLists: build.query<
      { affiliateList: SelectList; networkList: SelectList },
      void
    >({
      query: () => '/get-timetable-select-lists',
      providesTags: ['TimetableSelectLists'],
    }),
    getAffiliatesList: build.query<SelectList, void>({
      query: () => '/get-affiliate-list',
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
  useGetBrainListQuery,
  useLazyGetProxiesListQuery,
  useGetProfilesListsQuery,
    useGetNetworkListQuery,
  useGetAffiliatesListQuery,
  useGetTimetableListsQuery,
} = selectListsApiSlice;
