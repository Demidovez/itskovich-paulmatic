import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("notifications") }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result || [],
    }),
  }),
});

export const { useLazyGetNotificationsQuery } = notificationsApi;
