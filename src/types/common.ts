import { CashierFilters } from './cashier';
import { ReportFilters } from './report';
import { AccountsFilters, TimetableFilters } from './accounts';
import { BobIdFilters } from './bobIds';
import { ProxyFilters } from './proxies';
import { ProfilesFilters } from './profiles';

export interface FiltersState {
  accounts: AccountsFilters;
  bobIds: BobIdFilters;
  cashier: CashierFilters;
  proxies: ProxyFilters;
  profiles: ProfilesFilters;
  report: ReportFilters;
  timetable: TimetableFilters;
}

export interface SelectList {
  [key: number | string]: string;
}

export interface SelectOption {
  id: number | string;
  name: string | number;
  [key: string]: string | number;
}

export interface MuiDataGridSelectOption {
  value: number;
  label: string;
}

export interface SxProp {
  [key: string]: string | number;
}

export interface SelectListsState {
  affiliateList: SelectList;
  currenciesList: SelectList;
  monthsList: SelectList;
  networksList: SelectList;
  yearsListList: SelectList;
}

export interface SomeObject {
  [key: string]: any;
}

export type SelectedProperty = number | null | '';
