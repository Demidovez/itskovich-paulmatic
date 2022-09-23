import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("contacts") }),
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
      transformResponse: (response) =>
        response.result || { Items: [], TotalCount: 0 },
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
    deleteContacts: builder.mutation({
      query: (ids) => ({
        url: "/delete",
        method: "POST",
        body: ids,
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: (_, __, ids) => [
        ...ids.map((id) => ({ type: "Contacts", id })),
      ],
    }),
  }),
});

export const {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactsMutation,
} = contactsApi;
