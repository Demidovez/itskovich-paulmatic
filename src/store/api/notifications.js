import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("notifications") }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || [],
    }),
  }),
});

export const { useLazyGetNotificationsQuery } = notificationsApi;
