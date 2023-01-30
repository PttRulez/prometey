import { FiltersState, SelectListsState } from '../types/common';
import { AuthState } from '../types/auth';
import {
  emptyAccountsFilters,
  emptyBobIdFilters,
  emptyCashierFilters,
  emptyReportFilters,
  emptyTimetableFilters,
} from '../constants/empties';
import { NotificationState } from '../types/notifications';

const bearerToken = localStorage.getItem('bearerToken');

export const authInitialState: AuthState = {
  authenticated: !!bearerToken,
  user: null,
  loading: false,
  bearerToken: bearerToken,
};

export const authLogoutState: AuthState = {
  ...authInitialState,
  authenticated: false,
  bearerToken: null,
};

export const filtersInitialState: FiltersState = {
  accounts: emptyAccountsFilters,
  bobIds: emptyBobIdFilters,
  cashier: emptyCashierFilters,
  report: emptyReportFilters,
  timetable: emptyTimetableFilters,
}

export const notificationInitialState: NotificationState = {
  open: false,
  type: 'success',
  text: '',
};


export const selectListsInitialState: SelectListsState = {
  affiliateList: {},
  currenciesList: {},
  monthsList: {},
  networksList: {},
  yearsListList: {},
};

