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
          {
            allCount: 1000,
            items: [
              ...response.result.map((person) => ({
                id: person.id,
                FullName: person.FullName,
                Title: person.Title,
                Company: person.Company,
                Email: person.Email,
                Linkedin: person.Linkedin,
                Phone: person.Phone || "555 - 5 - 5555",
              })),
            ],
          } || {
            allCount: 0,
            items: [],
          }
        );
      },
    }),
  }),
});

export const { useGetPersonsInfoQuery, useLazyGetPersonsQuery } = personsApi;
