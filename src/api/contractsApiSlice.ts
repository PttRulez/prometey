import apiSlice from './apiSlice';
import { ContractFromServer, ContractInForm } from '../types/contracts';

export const contractsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContracts: build.query<ContractFromServer[], void>({
      query: () => '/contracts',
      providesTags: ['Contracts'],
    }),
    addContract: build.mutation<ContractFromServer, ContractInForm>({
      query: (body: ContractInForm) => ({
        url: '/contracts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contracts'],
    }),
    updateContract: build.mutation<ContractFromServer, ContractInForm>({
      query: (body: ContractInForm) => ({
        url: `/contracts/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Contracts'],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useAddContractMutation,
  useUpdateContractMutation,
} = contractsApiSlice;
