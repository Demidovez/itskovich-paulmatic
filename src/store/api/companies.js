import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerUrl} from "./server";

export const companiesApi = createApi({
    reducerPath: "companiesApi",
    baseQuery: fetchBaseQuery({baseUrl: getServerUrl("b2b")}),
    endpoints: (builder) => ({
        getCompaniesInfo: builder.query({
            query: () => ({
                url: "/info/companies",
                method: "GET",
                headers: {
                    "caller-version-code": 1,
                    sessionToken: "user-1",
                    "Content-type": "application/json",
                },
            }),
            transformResponse: (response) =>
                ({
                    description: response.result.description,
                    name: response.result.name,
                    filters: response.result.filters,
                } || {}),
        }),
        getCompanies: builder.query({
            query: (params) => ({
                url: "/search/companies",
                method: "GET",
                params: params || {},
                headers: {
                    "caller-version-code": 1,
                    sessionToken: "user-1",
                    "Content-type": "application/json",
                },
            }),
            transformResponse: (response) => {
                console.log(response.result.Items)
                return (
                    {
                        allCount: response.result.TotalCount,
                        items: response.result.Items
                    } || {
                        allCount: 0,
                        items: [],
                    }
                );
            },
        }),
    }),
});

export const {
    useGetCompaniesInfoQuery,
    useGetCompaniesQuery,
    useLazyGetCompaniesQuery,
} = companiesApi;
