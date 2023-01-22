import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getHeaders, getServerUrl } from './server';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl('') }),
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: 'stats',
        method: 'GET',
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || {},
    }),
  }),
});

export const { useLazyGetDashboardStatsQuery } = dashboardApi;
