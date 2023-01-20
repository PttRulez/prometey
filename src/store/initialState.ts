import { AccountsState } from '../types/accounts';
import { Network, NetworkState } from '../types/networks';
import { Contract, ContractsState } from '../types/contracts';
import { SelectListsState } from '../types/common';

export const accountsInitialState: AccountsState = {
  timetable: { affiliateList: {}, models: {}, networkList: {} },
  timeTableFilters: { network_id: '', affiliate_id: '' },
  accountsPage: { affiliateList: {}, models: [], networkList: {} },
  accountsFilters: {
    affiliate_id: '',
    bob_id: '',
    login: '',
    network_id: '',
    nickname: '',
  },
};

export const contractsInitialState: ContractsState = {
  contracts: [],
  contract: {} as Contract,
};

export const networksInitialState: NetworkState = {
  network: {} as Network,
  networkList: [],
  networkListLoading: false,
};

export const selectListsInitialState: SelectListsState = {
  affiliateList: {},
  currenciesList: {},
  monthsList: {},
  networksList: {},
  yearsListList: {},
};
