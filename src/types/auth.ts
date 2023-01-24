import { User } from './users';
import { CashierFilters } from './cashier';

export interface AuthState {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  bearerToken: string | null;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface GetProfileResponse {
  user: User;
}

export interface FiltersState {
  cashier: CashierFilters;
}
