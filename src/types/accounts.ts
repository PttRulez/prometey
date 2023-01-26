import { SelectedProperty, SelectList } from './common';
import { Affiliate } from './affiliates';
import { Discipline, Limit } from './other';
import { Room } from './rooms';
import { Network } from './networks';
import { Profile } from './profiles';

export interface Account {
  affiliate_id: SelectedProperty;
  bob_id: string;
  bob_id_id: SelectedProperty;
  brain_id: SelectedProperty;
  comment: string;
  creation_date: string;
  currency_id: SelectedProperty;
  disciplines: Discipline[];
  id: number;
  info: string;
  limits: Limit[];
  limits_group: Limit[];
  login: string;
  nickname: string;
  password: string;
  person_id: SelectedProperty;
  profile_id: SelectedProperty;
  proxy_id: SelectedProperty;
  room_id: SelectedProperty;
  shift_id: SelectedProperty;
  status_id: number | '';
}
export type AccountFromServer = Account & {
  affiliate?: Affiliate;
  brain: { id: number; name: string };
  created_by: number;
  profile: Profile;
  room: Room & { network: Network };
  status_id: number;
};

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
