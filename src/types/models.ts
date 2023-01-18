import { Discipline, Limit } from './other';

export interface User {
  id: number;
  name: string;
  email: string;
  api_token: string;
  avatar_url: string;
}

export type Network = {
  id: number;
  name: string;
  info: string | null;
};
export interface Affiliate {
  name: string;
  contact: string;
  info: string | null;
}

export interface Room {
  id: number;
  name: string;
  network_id: number;
  status_id: number;
  cashout_scenario: number;
  deposit_scenario: number;
  info: string | null;
  currency_id: number;
  mobile: number | boolean;
}

export interface Account {
  affiliate?: Affiliate;
  affiliate_id: number;
  bob_id_id: number | null;
  brain_id: number;
  comment: string;
  created_by: number;
  creation_date: string;
  currency_id: number;
  disciplines: Discipline[];
  id: number;
  info: string;
  limits: Limit[];
  limits_group: string;
  login: string;
  nickname: string;
  password: string;
  person_id: number;
  proxy_id: number;
  room?: Room;
  room_id: number;
  shift?: string;
  shift_id: number;
  status?: string;
  status_id: number;
  timetableClass?: string;
}
