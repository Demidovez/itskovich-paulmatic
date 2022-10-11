import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./server";
import { toast } from "react-toastify";

export const personsApi = createApi({
  reducerPath: "personsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("b2b") }),
  tagTypes: ["Persons"],
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
    getPersons: builder.query({
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
        return (
          response.result || {
            TotalCount: 0,
            Items: [],
          }
        );
      },
      providesTags: (result) =>
        result.Items
          ? [
              ...result.Items.map(({ id }) => ({ type: "Persons", id })),
              { type: "Persons", id: "LIST" },
            ]
          : [{ type: "Persons", id: "LIST" }],
    }),
    addToContacts: builder.query({
      query: (ids) => ({
        url: "/addToContacts",
        method: "GET",
        params: { entityIds: ids.join() },
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, _, arg) => {
        if ((response.result || {}).error || response.message) {
          toast.error(`Ошибка!`);
        } else {
          toast.success(`${arg.length} контакта(ов) добавлено!`);
        }
      },
    }),
    addToSequence: builder.query({
      query: ({ entityIds, sequenceId }) => ({
        url: "/addToSequence",
        method: "GET",
        params: { entityIds: entityIds.join(), sequenceId },
        headers: {
          "caller-version-code": 1,
          sessionToken: "user-1",
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, _, arg) => {
        if ((response.result || {}).error || response.message) {
          toast.error(`Ошибка!`);
        } else {
          toast.success(
            `Перейдите на страницу «Задачи» для коммуникации с клиентом`
          );
        }
      },
    }),
  }),
});

export const {
  useLazyGetPersonsInfoQuery,
  useLazyGetPersonsQuery,
  useLazyAddToContactsQuery,
  useLazyAddToSequenceQuery,
} = personsApi;
