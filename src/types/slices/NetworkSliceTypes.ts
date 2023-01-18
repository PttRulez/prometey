import { Network } from '../models';

export interface NetworkState {
  network: Network;
  networkList: Network[];
  networkListLoading: boolean;
}
