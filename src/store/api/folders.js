import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders, getServerUrl } from "./server";
import { toast } from "react-toastify";

export const foldersApi = createApi({
  reducerPath: "foldersApi",
  baseQuery: fetchBaseQuery({ baseUrl: getServerUrl("folders") }),
  tagTypes: ["Folder"],
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: () => ({
        url: "/search",
        method: "POST",
        body: {},
        headers: getHeaders(),
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
              ...result.Items.map(({ id }) => ({ type: "Folder", id })),
              { type: "Folder", id: "LIST" },
            ]
          : [{ type: "Folder", id: "LIST" }],
    }),
    deleteFolders: builder.mutation({
      query: (folders) => ({
        url: "delete",
        method: "POST",
        body: folders,
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        if (response.error) {
          toast.error(`Ошибка!`);
        } else {
          toast.success(`Папка удалена!`);
        }
      },
      invalidatesTags: [{ type: "Folder", id: "LIST" }],
    }),
    createOrUpdateFolder: builder.mutation({
      query: (folder) => ({
        url: "createOrUpdate",
        method: "POST",
        body: folder,
        headers: getHeaders(),
      }),
      transformResponse: (response, _, arg) => {
        if (response.error) {
          toast.error(`Ошибка!`);
        } else {
          if (arg.id >= 0) {
            toast.success(`Папка обновлена!`);
          } else {
            toast.success(`Папка создана!`);
          }
        }
      },
      invalidatesTags: [{ type: "Folder", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useDeleteFoldersMutation,
  useCreateOrUpdateFolderMutation,
} = foldersApi;
