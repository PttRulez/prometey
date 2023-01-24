import { AccountsState } from '../types/accounts';
import { Network, NetworkState } from '../types/networks';
import { Contract, ContractsState } from '../types/contracts';
import { SelectListsState } from '../types/common';
import { AuthState, FiltersState } from '../types/auth';
import { BobIdsState } from '../types/bobIds';
import { emptyBobIdFilters, emptyCashierFilters } from '../constants/empties';

const bearerToken = localStorage.getItem('bearerToken');

export const authInitialState: AuthState = {
  authenticated: !!bearerToken,
  user: null,
  loading: false,
  bearerToken: bearerToken,
};

export const emptyAuthState: AuthState = {
  ...authInitialState,
  bearerToken: null,
};

export const emptyFiltersState: FiltersState = {
  cashier: emptyCashierFilters,
}

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

export const bobIdsInitialState: BobIdsState = {
  filters: emptyBobIdFilters,
};
