import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("b2b") }),
  tagTypes: ["Companies"],
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
      providesTags: (result) =>
        result.Items
          ? [
              ...result.Items.map(({ id }) => ({ type: "Companies", id })),
              { type: "Companies", id: "LIST" },
            ]
          : [{ type: "Companies", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetCompaniesInfoQuery,
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
} = companiesApi;
