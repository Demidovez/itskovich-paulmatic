import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("") }),
  endpoints: (builder) => ({
    trySignUp1: builder.query({
      query: (body) => ({
        url: "login/signup",
        method: "POST",
        headers: getHeaders(),
        body,
      }),
      transformResponse: (response) => response.result || {},
    }),
    trySignUp: builder.query({
      query: () => ({
        url: "commons",
        method: "GET",
        headers: getHeaders({ sessionToken: "user-1" }),
      }),
      transformResponse: (response) => (response.result || {}).Account,
    }),
  }),
});

export const { useLazyTrySignUpQuery } = loginApi;
