import { Network } from './networks';

export interface Contract {
  created_at?: string;
  id: number;
  name: string;
  network_id: number;
  updated_at?: string;
}

export interface ContractInForm {
  id: number | null;
  name: string;
  network_id: number | null;
}

export const contractPropsArr = ['id', 'name', 'network_id'];

export interface ContractFromServer extends Contract {
  network: Network;
  profile: any;
}

export interface ContractsState {
  contracts: (ContractFromServer | Contract)[];
  contract: Contract;
}
