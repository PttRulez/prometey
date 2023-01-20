import { Network } from './networks';

export interface Contract {
  created_at: string;
  id: number;
  name: string;
  network_id: number;
  updated_at: string;
}

export const contractPropsArr = [
  'created_at',
  'id',
  'name',
  'network_id',
  'updated_at',
];

export interface ContractFromServer extends Contract {
  network: Network;
  profile: any;
}

export interface ContractsState {
  contracts: ContractFromServer[];
  contract: Contract;
}
