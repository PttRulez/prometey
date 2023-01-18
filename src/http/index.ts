import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AuthService from '../services/AuthService';

interface MyAxiosRequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: any;
}

let $api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use(function (config: MyAxiosRequestConfig) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

$api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.access_token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Не авторизован');
        window.location.href='/login'
      }
    }
    throw error;
  }
);

export default $api;
