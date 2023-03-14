import { ContractInForm } from '../types/contracts';
import { ProfileInForm } from '../types/profiles';
import { BobId, BobIdFilters } from '../types/bobIds';
import { Account, AccountsFilters, TimetableFilters } from '../types/accounts';
import { CashierFilters, Cashout, Deposit } from '../types/cashier';
import { cashoutStatuses } from './common';
import dayjs from 'dayjs';
import { ReportFilters } from '../types/report';

export const emptyAccountsFilters: AccountsFilters = {
  affiliate_id: '',
  bob_id: '',
  login: '',
  network_id: '',
  nickname: '',
};

export const emptyContract: ContractInForm = {
  id: null,
  name: '',
  network_id: null,
};

export const emptyProfile: ProfileInForm = {
  id: 0,
  contract_id: '',
  name: '',
  limits: [],
  shift_id: '',
  disciplines: [],
};

export const emptyBobIdFilters: BobIdFilters = {
  bob_id: '',
  network_id: '',
  show_deleted: false,
};

export const emptyBobId: BobId = {
  bob_id: '',
  disciplines: [],
  id: 0,
  limits: [],
  network_id: '',
  profile_id: '',
};

export const emptyCashout: Cashout = {
  account_id: 0,
  amount: 0,
  id: 0,
  status_id: cashoutStatuses.pending,
  type_id: 1,
  ordered_date: '',
  left_balance_date: '',
};

export const emptyCashierFilters: CashierFilters = {
  category: 'both',
  month: '',
  network_id: '',
  wait: true,
  year: '',
};

export const emptyTimetableFilters: TimetableFilters = {
  network_id: '',
  affiliate_id: '',
};

export const emptyDeposit: Deposit = {
  id: 0,
  account_id: 0,
  amount: '',
  ordered_date: '',
  reached_balance_date: '',
  comment: '',
};

export const emptyReportFilters: ReportFilters = {
  nickname: '',
  year: String(dayjs().year()),
  month: String(dayjs().month() + 1),
  network_id: '',
  brain_id: '',
};

export const emptyAccount: Account = {
  affiliate_id: '',
  bob_id: '',
  bob_id_id: '',
  brain_id: '',
  comment: '',
  creation_date: '',
  currency_id: '',
  disciplines: [],
  id: 0,
  info: '',
  limits: [],
  limits_group: [],
  login: '',
  nickname: '',
  password: '',
  person_id: '',
  profile_id: '',
  proxy_id: '',
  room_id: '',
  shift_id: '',
  status_id: '',
};
