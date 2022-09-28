import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("tasks") }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (params) => ({
        url: "/search/persons",
        method: "GET",
        params: params || {},
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => {
        return response.result || [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks", id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const { useLazyGetTasksQuery } = tasksApi;
