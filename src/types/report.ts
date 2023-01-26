import { AccountFromServer } from './accounts';
import { Deposit } from './cashier';

export interface ReportFilters {
  nickname: string;
  year: number | string;
  month: number | string;
  network_id: number | '';
  brain_id: number | '';
}

export interface ReportFromServer {
    account: AccountFromServer;
    account_id: number;
    bankroll_finish: number;
    bankroll_start: number;
    bobId: number;
    brain: any;
    cashoutSum: number;
    created_at: string;
    currency_id: number;
    deposits: Deposit[];
    depositsSum: number;
    hands_played: number;
    id: number;
    month: number;
    monthName: string;
    network_id: number;
    ngpSum: number;
    nickname: string;
    total: number;
    updated_at: string;
    win: number;
    year: number;
}
