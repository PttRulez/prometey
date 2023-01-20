import { AxiosResponse } from 'axios';
import $api from '../http';
import { SelectList } from '../types/common';

const HelpersService = {
  fetchNetworksList(): Promise<AxiosResponse<SelectList>> {
    return $api.get<SelectList>('/get-network-list');
  },
};

export default HelpersService;
