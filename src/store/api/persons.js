import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const personsApi = createApi({
  reducerPath: "personsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.156.119.155:3002/b2b" }),
  endpoints: (builder) => ({
    getPersonsInfo: builder.query({
      query: () => ({
        url: "/info/persons",
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

export const { useGetPersonsInfoQuery } = personsApi;
