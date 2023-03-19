import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AuthService from '../services/AuthService';

let $api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(
    'bearerToken'
  )}`;
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log('interceptor 2')
    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem('bearerToken', response.data.access_token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Не авторизован');
        window.location.href = '/login';
      }
    }
    console.log('interceptor 1')
    throw error;
  }
);

export default $api;
