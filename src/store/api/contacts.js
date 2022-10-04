import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";
import { toast } from "react-toastify";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("contacts") }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ body, params }) => ({
        url: "/search",
        method: "POST",
        params: params || {},
        body: body || {},
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
      transformResponse: (response, _, arg) => {
        if (response.result && response.result.id === arg.id) {
          toast.success(`${response.result.name} обновлен`);
        } else if (response.result && response.result.id !== arg.id) {
          toast.success(`${response.result.name} создан`);
        } else {
          toast.error(`Ошибка!`);
        }
      },
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    addContacts: builder.mutation({
      query: (contacts) => ({
        url: "/create",
        method: "POST",
        body: contacts,
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
        },
      }),
      transformResponse: (response) => {
        if (response.result) {
          toast.success(`${response.result} контактов добавлено!`);
        } else {
          toast.error(`Ошибка!`);
        }
      },
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    uploadFileOfContacts: builder.mutation({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
        },
      }),
      transformResponse: (response) => {
        if (response.result) {
          toast.success(`${response.result} контактов добавлено!`);
        } else {
          toast.error(`Ошибка!`);
        }
      },
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
      transformResponse: (response, _, arg) => {
        if (response.executionTimeMs && arg.length > 1) {
          toast.success(`Контакты удалены!`);
        } else if (response.executionTimeMs && arg.length > 0) {
          toast.success(`Контакт удален!`);
        } else {
          toast.error(`Ошибка!`);
        }
      },
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
  useUploadFileOfContactsMutation,
  useAddContactsMutation,
} = contactsApi;
