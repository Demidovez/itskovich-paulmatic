import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("b2b") }),
  tagTypes: ["Companies"],
  endpoints: (builder) => ({
    getCompaniesInfo: builder.query({
      query: () => ({
        url: "/info/companies",
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || {},
    }),
    getCompanies: builder.query({
      query: (params) => ({
        url: "/search/companies",
        method: "GET",
        params: params || {},
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        return (
          response.result || {
            TotalCount: 0,
            Items: [],
          }
        );
      },
      providesTags: (result) =>
        (result || {}).Items
          ? [
              ...result.Items.map(({ id }) => ({ type: "Companies", id })),
              { type: "Companies", id: "LIST" },
            ]
          : [{ type: "Companies", id: "LIST" }],
    }),
  }),
});

export const useGetCompaniesState =
  companiesApi.endpoints.getCompanies.useQueryState;

export const useLazyGetCompaniesSubscription =
  companiesApi.endpoints.getCompanies.useLazyQuerySubscription;

export const useGetCompaniesSubscription =
  companiesApi.endpoints.getCompanies.useQuerySubscription;

export const {
  useLazyGetCompaniesInfoQuery,
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
} = companiesApi;
