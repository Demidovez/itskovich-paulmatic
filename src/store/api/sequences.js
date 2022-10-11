import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";
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
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
        },
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
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
        },
      }),
      transformResponse: (response, _, arg) => {
        if ((response.result || {}).error) {
          toast.error(`Ошибка!`);
        } else {
          // toast.success(
          //   `${arg.ids.length} контакта(ов) добавлено в «${arg.sequence.Name}»!`
          // );
          toast.success(
            `Перейдите на страницу «Задачи» для коммуникации с клиентом`
          );
        }
      },
    }),
  }),
});

export const {
  useLazyGetSequencesQuery,
  useGetSequencesQuery,
  useLazyAddContactsToSequenceQuery,
} = sequencesApi;
