import { BobId } from './bobIds';
import { ContractFromServer } from './contracts';
import { Account } from './accounts';
import { Network } from './networks';
import { Discipline, Limit } from './other';

export interface Profile {
  contract_id: number;
  id: number;
  name: string;
  limits: Limit[];
  disciplines: Discipline[];
  shift_id: number | null | '';
  created_at?: string;
  updated_at?: string;
}

export const profileFormProps = [
  'contract_id',
  'id',
  'name',
  'limits',
  'disciplines',
  'shift_id'
];

export type ProfileInForm = Omit<
  Profile,
  'contract_id' | 'created_at' | 'updated_at'
> & { contract_id: number | '' };

export interface ProfileFromServer extends Profile {
  bob_id: BobId & {
    active_accounts: Account[];
    accounts?: Account[];
  };
  accounts: Account[];
  contract: Omit<ContractFromServer, 'profile'> & { network: Network };
}

export interface ProfilesFilters {
  network_id: number | '';
}
