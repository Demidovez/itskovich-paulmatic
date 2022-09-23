import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const personsApi = createApi({
  reducerPath: "personsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("b2b") }),
  endpoints: (builder) => ({
    getPersonsInfo: builder.query({
      query: () => ({
        url: "/info/persons",
        method: "GET",
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result || {},
    }),
    getPersons: builder.query({
      query: (params) => ({
        url: "/search/persons",
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

export const { useLazyGetPersonsInfoQuery, useLazyGetPersonsQuery } =
  personsApi;
