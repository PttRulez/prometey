import apiSlice from './apiSlice';
import { Report, ReportFilters, ReportFromServer } from '../types/report';
import { SelectList } from '../types/common';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query<
      {
        reports: ReportFromServer[];
        networkList: SelectList;
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
    updateReport: build.mutation<any, any>({
      query: (body: Report) => ({
        url: `/bob-reports/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const { useGetReportQuery, useUpdateReportMutation } =  reportApiSlice;
