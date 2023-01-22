import { Discipline, Limit } from './other';
import { Account } from './accounts';
import { Network } from './networks';

export interface BobId {
  bob_id: number | string;
  disciplines: Discipline[];
  id: number;
  limits: Limit[];
  network_id: number | '';
  profile_id: number | '';
}
export const bobIdPropsArr = [
  'bob_id',
  'disciplines',
  'id',
  'limits',
  'network_id',
  'profile_id',
];

export interface BobIdFromServer extends BobId {
  accounts: Account[];
  active_accounts: Account[];
  network: Network;
}

export interface BobIdsState {
  filters: BobIdFilters;
}

export interface BobIdFilters {
  bob_id: string;
  network_id: number | '';
  show_deleted: boolean;
}
