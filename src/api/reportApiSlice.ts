import apiSlice from './apiSlice';
import { ReportFilters, ReportFromServer } from '../types/report';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query<
      {
        reports: ReportFromServer[];
        networkList: any;
      },
      ReportFilters
    >({
      query: (filters: ReportFilters) => {
        return {
          url: '/bob-reports',
          method: 'GET',
          params: { filters: JSON.stringify(filters) },
        };
      },
      providesTags: ['Report'],
    }),
  }),
});

export const { useGetReportQuery } =  reportApiSlice;
