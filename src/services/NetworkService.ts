import { AxiosResponse } from 'axios';
import $api from '../http';
import { Network } from '../types/models';

const NetworkService = {
  fetchNetworks(): Promise<AxiosResponse<Network[]>> {
    return $api.get<Network[]>('/networks');
  },
  fetchSingleNetwork(id: number | string): Promise<AxiosResponse<Network>> {
    return $api.get<Network>(`/networks/${id}`);
  },
};

export default NetworkService;
