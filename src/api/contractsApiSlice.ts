import apiSlice from './apiSlice';
import { ContractFromServer } from '../types/contracts';

export const contractsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContracts: build.query<ContractFromServer[], void>({
      query: () => '/contracts',
      providesTags: ['Contracts'],
    }),
    // addProfile: build.mutation<ProfileFromServer, ProfileInForm>({
    //   query: (body: ProfileInForm) => ({
    //     url: '/profiles',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Profiles', 'ProfilesSelectList'],
    // }),
    // updateProfile: build.mutation<ProfileFromServer, ProfileInForm>({
    //   query: (body: ProfileInForm) => ({
    //     url: `/profiles/${body.id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Profiles', 'ProfilesSelectList'],
    // }),
  }),
});

export const {
  useGetContractsQuery
} = contractsApiSlice;
