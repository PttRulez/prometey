import apiSlice from './apiSlice';

export const selectListsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
} = selectListsApiSlice;
