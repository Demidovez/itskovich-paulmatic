import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.156.119.155:3002/contacts" }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/search",
        method: "POST",
        body: {},
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result,
    }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
