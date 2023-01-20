import { SelectList } from './common';
import { Affiliate } from './affiliates';
import { Discipline, Limit } from './other';
import { Room } from './rooms';

export interface Account {
  affiliate?: Affiliate;
  affiliate_id: number;
  bob_id_id: number | null;
  brain_id: number;
  comment: string;
  created_by: number;
  creation_date: string;
  currency_id: number;
  disciplines: Discipline[];
  id: number;
  info: string;
  limits: Limit[];
  limits_group: string;
  login: string;
  network_id: number;
  nickname: string;
  password: string;
  person_id: number;
  proxy_id: number;
  room?: Room;
  room_id: number;
  shift?: string;
  shift_id: number;
  status?: string;
  status_id: number;
  timetableClass?: string;
}

export interface TimetableFilters {
  affiliate_id: number | string;
  are_used_now?: boolean;
  bob_id?: string;
  login?: string;
  network_id: number | string;
  nickname?: string;
}

export interface AccountsState {
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
