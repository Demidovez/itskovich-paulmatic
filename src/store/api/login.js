import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";
import { Buffer } from "buffer";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("accounts") }),
  endpoints: (builder) => ({
    trySignUp: builder.query({
      query: (params) => ({
        url: "/register",
        method: "GET",
        params: params,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result,
    }),
    tryLognIn: builder.query({
      query: ({ username, password }) => ({
        url: "/login",
        method: "GET",
        headers: getHeaders({
          Authorization:
            "Basic " +
            Buffer.from(`${username}:${password}`, "binary").toString("base64"),
        }),
      }),
      transformResponse: (response) => response.result,
    }),
  }),
});

export const { useLazyTrySignUpQuery, useLazyTryLognInQuery } = loginApi;
