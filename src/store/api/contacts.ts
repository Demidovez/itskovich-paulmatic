import { toast } from 'react-toastify';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getHeaders, getServerUrl } from './server';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl('contacts') }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ body, params }) => ({
        url: '/search',
        method: 'POST',
        params: params || {},
        body: body || {},
        headers: getHeaders(),
      }),
      transformResponse: (response) =>
        response.result || { Items: [], TotalCount: 0 },
      providesTags: (result) =>
        result.Items
          ? [
            ...result.Items.map(({ id }) => ({ type: 'Contacts', id })),
            { type: 'Contacts', id: 'LIST' },
          ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    createOrUpdateContact: builder.mutation({
      query: (contact) => ({
        url: '/createOrUpdate',
        method: 'POST',
        body: contact,
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if (response.result && response.result.id === arg.id) {
          toast.success(
            `${
              response.result.FistName + ' ' + response.result.LastName
            } обновлен`,
          );
        } else if (response.result && response.result.id !== arg.id) {
          toast.success(
            `${
              response.result.FistName + ' ' + response.result.LastName
            } создан`,
          );
        } else {
          toast.error('Ошибка!');
        }
      },
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContacts: builder.mutation({
      query: (contacts) => ({
        url: '/create',
        method: 'POST',
        body: contacts,
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        if (response.result) {
          toast.success(`${response.result} контактов добавлено!`);
        } else {
          toast.error('Ошибка!');
        }
      },
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    uploadFileOfContacts: builder.mutation({
      query: (file) => ({
        url: '/upload',
        method: 'POST',
        body: file,
        headers: getHeaders({}, true),
      }),
      transformResponse: (response) => {
        if (response.result) {
          toast.success(`${response.result} контактов добавлено!`);
        } else {
          toast.error('Ошибка!');
        }
      },
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    getSchemaFile: builder.query({
      query: (firstRowsOfFile) => ({
        url: '/upload/detectSchema',
        method: 'POST',
        body: firstRowsOfFile,
        headers: getHeaders(),
      }),
      transformResponse: (response) => response.result,
    }),
    deleteContacts: builder.mutation({
      query: (ids) => ({
        url: '/delete',
        method: 'POST',
        body: ids,
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if (response.executionTimeMs && arg.length > 1) {
          toast.success('Контакты удалены!');
        } else if (response.executionTimeMs && arg.length > 0) {
          toast.success('Контакт удален!');
        } else {
          toast.error('Ошибка!');
        }
      },
      invalidatesTags: (_, __, ids) => [
        ...ids.map((id) => ({ type: 'Contacts', id })),
      ],
    }),
    tryExport: builder.query({
      query: () => ({
        url: '/export',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useLazyGetContactsQuery,
  useCreateOrUpdateContactMutation,
  useDeleteContactsMutation,
  useUploadFileOfContactsMutation,
  useAddContactsMutation,
  useLazyTryExportQuery,
  useLazyGetSchemaFileQuery,
} = contactsApi;
