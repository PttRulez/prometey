import { AxiosResponse } from 'axios';
import $api from '../http';
import { User } from '../types/models';
import { AuthResponse } from '../types/slices/AuthSliceTypes';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/auth/refresh');
  }

  static async getUserProfile(): Promise<AxiosResponse<User>> {
    return $api.get('/auth/user-profile');
  }
}
