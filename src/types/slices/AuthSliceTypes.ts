import { User } from "../models";

export interface AuthState {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in:  number;
  user: User;
}

export interface GetProfileResponse {
  user: User;
}