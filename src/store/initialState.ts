import { AccountsSliceState } from '../types/Accounts';

export const accountsInitialState: AccountsSliceState = {
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
