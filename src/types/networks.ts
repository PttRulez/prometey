export type Network = {
  id: number;
  name: string;
  info: string | null;
};

export interface NetworkState {
  network: Network;
  networkList: Network[];
  networkListLoading: boolean;
}
