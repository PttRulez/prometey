import { Network } from './networks';

export interface Room {
  id: number;
  name: string;
  network_id: number;
  network: Network;
  status_id: number;
  cashout_scenario: number;
  deposit_scenario: number;
  info: string | null;
  currency_id: number;
  mobile: number | boolean;
}
