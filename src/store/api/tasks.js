import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("tasks") }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (body) => ({
        url: "/search",
        method: "POST",
        body: body || {},
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
        },
      }),
      transformResponse: (response) => {
        return response.result || [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
  }),
});

export const { useLazyGetTasksQuery } = tasksApi;
