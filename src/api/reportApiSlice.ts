import apiSlice from './apiSlice';
import {
  MonthBankrollsUpdate,
  Report,
  ReportFilters,
  ReportFromServer,
} from '../types/report';
import { SelectList } from '../types/common';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation<any, { month: number; year: number }>({
      query: (body) => ({
        url: '/bob-reports/create-month',
        method: 'GET',
        params: { ...body },
      }),
      invalidatesTags: ['Report'],
    }),
    deleteReport: build.mutation<any, number>({
      query: (id) => ({
        url: `/bob-reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
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
    updateReport: build.mutation<any, Report>({
      query: (body) => ({
        url: `/bob-reports/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Report'],
    }),
    updateMonthBankrolls: build.mutation<any, MonthBankrollsUpdate>({
      query: (body) => ({
        url: '/bob-reports/update-month-bankroll-start',
        method: 'GET',
        params: { ...body },
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const { useCreateReportMutation, useDeleteReportMutation, useGetReportQuery, useUpdateMonthBankrollsMutation, useUpdateReportMutation } =  reportApiSlice;
