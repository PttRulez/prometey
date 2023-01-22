import apiSlice from './apiSlice';

export const selectListsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProfilesLists: build.query<any, void>({
      query: () => '/profiles/get-all-lists',
      providesTags: ['ProfilesSelectList'],
    }),
  }),
});

export const { useGetProfilesListsQuery } = selectListsApiSlice;
