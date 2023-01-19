import { SelectList } from './common';

export interface TimetableFilters {
  affiliate_id: number | string;
  are_used_now?: boolean;
  bob_id?: string;
  login?: string;
  network_id: number | string;
  nickname?: string;
}

export interface AccountsSliceState {
  accountsFilters: AccountsFilters;
  timetable: AccountsResponse;
  timeTableFilters: TimetableFilters;
  accountsPage: AccountsResponse;
}

export interface AccountsFilters {
  affiliate_id: string;
  bob_id: string;
  login: string;
  network_id: string;
  nickname: string;
}

export interface AccountsResponse {
  affiliateList: SelectList;
  models: any;
  networkList: SelectList;
}
