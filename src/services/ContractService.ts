import { AxiosResponse } from 'axios';
import $api from '../http';
import { ContractFromServer, ContractInForm } from '../types/contracts';

const ContractService = {
  fetchContracts(): Promise<AxiosResponse<ContractFromServer[]>> {
    return $api.get<ContractFromServer[]>('/contracts');
  },
  createContract(
    contract: ContractInForm
  ): Promise<AxiosResponse<ContractFromServer>> {
    return $api.post(`/contracts`, contract);
  },
  updateContract(
    contract: ContractInForm
  ): Promise<AxiosResponse<ContractFromServer>> {
    return $api.put(`/contracts/${contract.id}`, contract);
  },
};

export default ContractService;
