import { AxiosResponse } from 'axios';
import $api from '../http';
import { Contract, ContractFromServer } from '../types/contracts';

const ContractService = {
  fetchContracts(): Promise<AxiosResponse<ContractFromServer[]>> {
    return $api.get<ContractFromServer[]>('/contracts');
  },
  updateContract(contract: Contract): Promise<AxiosResponse<any>> {
    return $api.put(`/contracts/${contract.id}`, contract);
  },
};

export default ContractService;
