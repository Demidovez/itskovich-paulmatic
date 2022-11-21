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
    tryDelete: builder.query({
      query: () => ({
        url: "/delete",
        method: "GET",
        headers: getHeaders(),
      }),
    }),
    trySaveEmailServer: builder.query({
      query: (body) => ({
        url: "/setEmailSettings",
        method: "POST",
        body: body,
        headers: getHeaders(),
      }),
    }),
    tryUpdate: builder.query({
      query: (body) => ({
        url: "/update",
        method: "POST",
        body: body,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result,
    }),
    tryUpdatePayment: builder.query({
      query: (body) => ({
        url: "/update_payment",
        method: "POST",
        body: body,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result,
    }),
    tryDeleteSubordinate: builder.query({
      query: (id) => ({
        url: "/deleteSubordinate",
        method: "GET",
        params: { id },
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useLazyTrySignUpQuery,
  useLazyTryLognInQuery,
  useLazyTrySaveEmailServerQuery,
  useLazyTryUpdateQuery,
  useLazyTryUpdatePaymentQuery,
  useLazyTryDeleteQuery,
  useLazyTryDeleteSubordinateQuery,
} = loginApi;
