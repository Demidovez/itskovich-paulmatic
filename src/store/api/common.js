import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("") }),
  endpoints: (builder) => ({
    getCommonInfo: builder.query({
      query: () => ({
        url: "commons",
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        // console.log(response.result);
        return response.result || {};
      },
    }),
    getTariffs: builder.query({
      query: () => ({
        url: "accounting/tariffs",
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || [],
    }),
  }),
});

export const {
  useLazyGetCommonInfoQuery,
  useGetCommonInfoQuery,
  useLazyGetTariffsQuery,
} = commonApi;
