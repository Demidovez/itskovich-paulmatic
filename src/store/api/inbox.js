import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const inboxApi = createApi({
  reducerPath: "inboxApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("inbox") }),
  endpoints: (builder) => ({
    getCommonInfo: builder.query({
      query: () => ({
        url: "/ddd",
        method: "GET",
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result || {},
    }),
  }),
});

export const { useLazyGetCommonInfoQuery } = inboxApi;
