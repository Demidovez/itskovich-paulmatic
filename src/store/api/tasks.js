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
        return (
          response.result.map((task, i) => {
            if (i == 3 || i == 8 || i == 1) {
              return {
                ...task,
                Awareness: "#E74C3C",
                StartTime: "2022-09-26T18:14:36.2728757+03:00",
              };
            } else if (i == 6 || i == 10 || i == 4) {
              return {
                ...task,
                Awareness: "#27AE60",
                DueTime: "2022-09-30T09:50:36.2728757+03:00",
              };
            } else {
              return { ...task, Awareness: "#F1C40F" };
            }
          }) || []
        ); // ЗАГЛУШКА!!!!!!!!!!!!!!!!!
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
