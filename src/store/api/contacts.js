import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.156.119.155:3002/contacts" }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (search) => ({
        url: "/search",
        method: "POST",
        body: search ? { name: search } : {},
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response) => response.result || {},
      providesTags: (result) =>
        result.Items
          ? [
              ...result.Items.map(({ id }) => ({ type: "Contacts", id })),
              { type: "Contacts", id: "LIST" },
            ]
          : [{ type: "Contacts", id: "LIST" }],
    }),
    createOrUpdateContact: builder.mutation({
      query: (contact) => ({
        url: "/createOrUpdate",
        method: "POST",
        body: contact,
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: "/delete",
        method: "POST",
        body: { id },
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: (_, __, id) => [{ type: "Contacts", id }],
    }),
  }),
});

export const {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
