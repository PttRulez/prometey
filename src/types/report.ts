import { AccountFromServer } from './accounts';
import { Deposit } from './cashier';

export interface MonthBankrollsUpdate {
  year: number;
  month: number;
}

export interface ReportFilters {
  nickname: string;
  year: number | string;
  month: number | string;
  network_id: number | '';
  brain_id: number | '';
}

export const reportFormProps = ['id', 'account_id', 'bankroll_finish', 'bankroll_start', 'currency_id', 'month', 'total', 'win', 'year'];

export interface Report {
    id: number;
    account_id: number;
    bankroll_finish: number;
    bankroll_start: number;
    currency_id: number;
    month: number;
    total: number;
    win: number;
    year: number;
}

export interface ReportFromServer extends Report {
    account: AccountFromServer;
    bobId: number;
    brain: any;
    cashoutSum: number;
    created_at: string;
    deposits: Deposit[];
    depositsSum: number;
    hands_played: number;
    monthName: string;
    network_id: number;
    ngpSum: number;
    nickname: string;
    updated_at: string;
}
