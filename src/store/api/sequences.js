import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";
import { toast } from "react-toastify";

export const sequencesApi = createApi({
  reducerPath: "sequencesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("sequences") }),
  tagTypes: ["Sequence"],
  endpoints: (builder) => ({
    getSequences: builder.query({
      query: ({ body, params }) => ({
        url: "/search",
        method: "POST",
        body: body || {},
        params,
        headers: getHeaders(),
      }),
      transformResponse: (response) =>
        response.result || { Items: [], TotalCount: 0 },
      providesTags: (result) =>
        result
          ? [
              ...result.Items.map(({ id }) => ({ type: "Sequence", id })),
              { type: "Sequence", id: "LIST" },
            ]
          : [{ type: "Sequence", id: "LIST" }],
    }),
    addContactsToSequence: builder.query({
      query: ({ sequence, ids }) => ({
        url: "/addContacts",
        method: "GET",
        params: {
          contactIds: ids.join(),
          sequenceId: sequence,
        },
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if ((response.result || {}).error) {
          toast.error(`Ошибка!`);
        } else {
          toast.success(
            `Перейдите на страницу «Задачи» для коммуникации с клиентом`
          );
        }
      },
    }),
    stopSequences: builder.mutation({
      query: (sequenceIds) => ({
        url: "/stop",
        method: "GET",
        params: {
          sequenceIds: sequenceIds.join(),
        },
        headers: getHeaders(),
      }),
      invalidatesTags: [{ type: "Sequence", id: "LIST" }],
    }),
    startSequences: builder.mutation({
      query: (sequenceIds) => ({
        url: "/start",
        method: "GET",
        params: {
          sequenceIds: sequenceIds.join(),
        },
        headers: getHeaders(),
      }),
      invalidatesTags: [{ type: "Sequence", id: "LIST" }],
    }),
    deleteSequences: builder.query({
      query: (sequenceIds) => ({
        url: "/delete",
        method: "GET",
        params: {
          sequenceIds: sequenceIds.join(),
        },
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if ((response.result || {}).error) {
          toast.error(`Ошибка!`);
        } else {
          // toast.success(
          //   `${arg.ids.length} контакта(ов) добавлено в «${arg.sequence.Name}»!`
          // );
          toast.success(`Последовательность удалена!`);
        }
      },
    }),
    createOrUpdateSequence: builder.mutation({
      query: (model) => ({
        url: "/createOrUpdate",
        method: "POST",
        body: model,
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if (response.result && arg.id) {
          toast.success(`Последовательность обновлена`);
        } else if (response.result) {
          toast.success(`Последовательность создана`);
        } else {
          toast.error(`Ошибка!`);
        }

        return response.result || {};
      },
      invalidatesTags: [{ type: "Sequence", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetSequencesQuery,
  useGetSequencesQuery,
  useLazyAddContactsToSequenceQuery,
  useStopSequencesMutation,
  useStartSequencesMutation,
  useLazyDeleteSequencesQuery,
  useCreateOrUpdateSequenceMutation,
} = sequencesApi;
