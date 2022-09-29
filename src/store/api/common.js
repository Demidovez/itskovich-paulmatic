import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("") }),
  endpoints: (builder) => ({
    getCommonInfo: builder.query({
      query: () => ({
        url: "commons",
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

export const { useLazyGetCommonInfoQuery } = commonApi;
