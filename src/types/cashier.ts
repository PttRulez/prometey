import { Account } from './accounts';

export interface Cashout {
  account_id: number;
  amount: number;
  id: number;
  status_id: number;
  ordered_date?: string;
  type_id: number;
  left_balance_date?: string;
}

export interface CashoutFromServer extends Cashout {
  account: Account;
  comesBackIfCanceled: boolean;
  createdBy: string;
  goesFromMain: boolean;
  goesToMain: boolean;
  instant: boolean;
  orderFromAff: boolean;
  pending: boolean;
  status: string;
  whenOrdered: string;
}

export interface Deposit {
  id: number;
  account_id: number;
  amount: string;
  reached_balance_date: string;
  comment: string | null;
}

export interface DepositFromServer extends Deposit {
  account: Account;
  orderFromAff: boolean;
}

// const STATUSES = [''success', 'error'] as const
// type Statuses = typeof STATUSES[number]


export interface CashierFilters {
  category: 'both' | 'deposits' | 'cashouts';
  month: number | '';
  network_id: number | '';
  wait: boolean;
  year: number | ''
}
