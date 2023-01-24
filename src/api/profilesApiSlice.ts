import apiSlice from './apiSlice';
import { ProfileFromServer, ProfileInForm } from '../types/profiles';

export const profilesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProfiles: build.query<ProfileFromServer[], void>({
      query: () => '/profiles',
      transformResponse: (res: ProfileFromServer[]) =>
        res.sort((a, b) =>
          a.name.localeCompare(b.name, 'ru', { numeric: true })
        ),
      providesTags: ['Profiles'],
    }),
    addProfile: build.mutation<ProfileFromServer, ProfileInForm>({
      query: (body: ProfileInForm) => ({
        url: '/profiles',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'Profiles',
        'ProfilesSelectList',
        'preparedAccountFormData',
      ],
    }),
    updateProfile: build.mutation<ProfileFromServer, ProfileInForm>({
      query: (body: ProfileInForm) => ({
        url: `/profiles/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [
        'Profiles',
        'ProfilesSelectList',
        'preparedAccountFormData',
      ],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
} = profilesApiSlice;
