import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const inboxApi = createApi({
  reducerPath: "inboxApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("chats") }),
  endpoints: (builder) => ({
    sendMessage: builder.query({
      query: (body) => ({
        url: "/sendMsg",
        method: "POST",
        body: body,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || {},
    }),
    searchChat: builder.query({
      query: (body) => ({
        url: "/search",
        method: "POST",
        body: body,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || [],
    }),
    moveToFolder: builder.query({
      query: (params) => ({
        url: "/moveToFolder",
        method: "GET",
        params: params,
        headers: getHeaders(),
      }),
    }),
    deleteChat: builder.query({
      query: (id) => ({
        url: "/clear",
        method: "POST",
        body: {
          id,
        },
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useLazySendMessageQuery,
  useLazySearchChatQuery,
  useLazyMoveToFolderQuery,
  useLazyDeleteChatQuery,
} = inboxApi;
