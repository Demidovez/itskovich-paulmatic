import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("tasks") }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ body, params }) => ({
        url: "/search",
        method: "POST",
        body: {
          ...(body || {}),
          Status: "-pending,-archived",
          Type: "-auto_email",
          Invisible: true,
        },
        params,
        headers: getHeaders(),
      }),
      transformResponse: (response) =>
        response.result || { Items: [], TotalCount: 0 },
      providesTags: (result) =>
        result
          ? [
              ...result.Items.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    executeTask: builder.mutation({
      query: (task) => ({
        url: "/execute",
        method: "POST",
        body: task || {},
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        return response.result || {};
      },
      // invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    skipTask: builder.mutation({
      query: ({ id, accountId }) => ({
        url: "/skip",
        method: "POST",
        body: { id, accountId },
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        return response.result || {};
      },
      // invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    replyTask: builder.mutation({
      query: ({ id, accountId }) => ({
        url: "/markReplied",
        method: "POST",
        body: { id, accountId },
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        return response.result || {};
      },
      // invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    getStatisticsOfTasks: builder.query({
      query: () => ({
        url: "/stats",
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result || {},
    }),
  }),
});

export const {
  useLazyGetTasksQuery,
  useExecuteTaskMutation,
  useSkipTaskMutation,
  useReplyTaskMutation,
  useLazyGetStatisticsOfTasksQuery,
} = tasksApi;
