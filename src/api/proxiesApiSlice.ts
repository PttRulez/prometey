import apiSlice from './apiSlice';
import { Proxy, ProxyFilters, ProxyFromServer } from '../types/proxies';

export const proxiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProxies: build.query<ProxyFromServer[], ProxyFilters>({
      query: (filters) => {
        const { name, show_deleted } = filters;
        return {
          url: 'proxies/',
          params: { filters: JSON.stringify(filters) },
        };
      },
      providesTags: ['Proxies'],
    }),
    addProxy: build.mutation<any, Proxy>({
      query: (body) => ({
        url: '/proxies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proxies'],
    }),
    updateProxy: build.mutation<any, Proxy>({
      query: (body) => ({
        url: `/proxies/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Proxies'],
    }),
  }),
});

export const {
  useGetProxiesQuery,
  useAddProxyMutation,
  useUpdateProxyMutation,
} = proxiesApiSlice;
