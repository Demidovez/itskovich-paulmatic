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
      transformResponse: (response) =>
        ({
          description: response.result.description,
          name: response.result.name,
          filters: response.result.filters.map((filter) =>
            filter.Name === "country"
              ? { ...filter, Variants: ["Россия"] }
              : filter.Name === "region"
              ? {
                  ...filter,
                  Variants: [
                    "country=Россия;Абакан",
                    "country=Россия;Архангельск",
                    "country=Россия;Астрахань",
                    "country=Россия;Барнаул",
                  ],
                }
              : filter
          ),
        } || {}),
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
        return [...response.result.slice(0, 500)] || [];
      },
    }),
  }),
});

export const {
  useGetCompaniesInfoQuery,
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
} = companiesApi;
