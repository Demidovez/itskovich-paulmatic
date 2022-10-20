import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("") }),
  endpoints: (builder) => ({
    trySignUp: builder.query({
      query: (params) => ({
        url: "/users/register",
        method: "GET",
        params: params,
        headers: getHeaders(), // { sessionToken: "user-1" }
      }),
      transformResponse: (response) => (response.result || {}).Account,
    }),
    tryLognIn: builder.query({
      query: (body) => ({
        url: "commons",
        method: "GET",
        headers: getHeaders({ sessionToken: "user-1" }),
      }),
      transformResponse: (response) => (response.result || {}).Account,
    }),
  }),
});

export const { useLazyTrySignUpQuery, useLazyTryLognInQuery } = loginApi;
