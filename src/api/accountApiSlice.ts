import apiSlice from './apiSlice';
import {
  Account,
  AccountFromServer,
  AccountsFilters,
  TimetableFilters,
} from '../types/accounts';
import { SelectList } from '../types/common';
import { ProfileFromServer } from '../types/profiles';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTimetable: build.query<any, TimetableFilters>({
      query: (filters) => {
        return {
          url: '/accounts/timetable',
          method: 'GET',
          params: { filters: JSON.stringify(filters) },
        };
      },
      providesTags: ['Timetable'],
    }),
    getAccounts: build.query<
      {
        affiliateList: SelectList;
        models: AccountFromServer[];
        networkList: SelectList;
      },
      AccountsFilters
    >({
      query: (filters) => {
        return {
          url: '/accounts',
          method: 'GET',
          params: { filters: JSON.stringify(filters) },
        };
      },
      providesTags: ['Accounts'],
    }),
    prepareFormData: build.query<any, number>({
      query: (id) => `/accounts/prepare-form-data/${id}`,
      transformResponse: (res: any) => {
        res.profileList = res.profileList.map((item: ProfileFromServer) => {
          return {
            ...item,
            label: `${item.contract.network.name} ${item.name} ${
              item.disciplines ? item.disciplines?.join(' ') : 'no-disciplines'
            } ${item.limits ? item.limits?.join(' ') : 'no-limits'}`,
          };
        });

        return res;
      },
      providesTags: ['preparedAccountFormData'],
    }),
    createAccount: build.mutation<AccountFromServer, Account>({
      query: (body: Account) => ({
        url: '/accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Accounts', 'preparedAccountFormData'],
    }),
    updateAccount: build.mutation<AccountFromServer, Account>({
      query: (body: Account) => ({
        url: `/accounts/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Accounts', 'preparedAccountFormData'],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetTimetableQuery,
  usePrepareFormDataQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} = accountApiSlice;
