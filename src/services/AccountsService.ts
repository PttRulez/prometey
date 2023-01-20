import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  Account,
  AccountsFilters,
  AccountsResponse,
  TimetableFilters,
} from '../types/accounts';

const AccountsService = {
  fetchTimetable(
    filters: TimetableFilters
  ): Promise<AxiosResponse<AccountsResponse>> {
    return $api.get('/accounts/timetable', {
      params: { filters: JSON.stringify(filters) },
    });
  },
  fetchAccounts(
    filters: AccountsFilters
  ): Promise<AxiosResponse<AccountsResponse>> {
    return $api.get('/accounts', {
      params: { filters: JSON.stringify(filters) },
    });
  },
  updateAccount(account: Account): Promise<AxiosResponse<any>> {
    return $api.put(`/accounts/${account.id}`, account);
  },
};

export default AccountsService;
