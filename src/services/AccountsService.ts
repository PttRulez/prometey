import { AxiosResponse } from 'axios';
import $api from '../http';

export interface TimetableFilters {
  affiliate_id: number | string;
  are_used_now?: boolean;
  bob_id?: string;
  login?: string;
  network_id: number | string;
  nickname?: string;
}

const AccountsService = {
  fetchTimetable(filters: TimetableFilters): Promise<AxiosResponse<any>> {
    return $api.get('/accounts/timetable', {
      params: { filters: JSON.stringify(filters) },
    });
  },
};

export default AccountsService;
