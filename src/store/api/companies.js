import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.156.119.155:3002/b2b" }),
  endpoints: (builder) => ({
    getCompaniesInfo: builder.query({
      query: () => ({
        url: "/info/companies",
        method: "GET",
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result || {},
    }),
    getCompanies: builder.query({
      query: (params) => ({
        url: "/search/companies",
        method: "GET",
        params: params || {},
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => {
        return (
          response.result || {
            TotalCount: 0,
            Items: [],
          }
        );
      },
    }),
  }),
});

export const {
  useGetCompaniesInfoQuery,
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
} = companiesApi;
