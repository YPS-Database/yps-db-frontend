import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UpdatePageRequest {
  token: string;
  id: string;
  body: {
    content: string;
    googleFormId: string;
  };
}

interface GetPageResponse {
  id: string;
  markdown: string;
  google_form_id: string;
  updated: number;
}

interface OkResponse {
  ok: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_YPSDB_API,
  }),
  tagTypes: ["pages", "entries"],
  endpoints: (build) => ({
    // pages
    //
    updatePage: build.mutation<OkResponse, UpdatePageRequest>({
      query: ({ token, body }) => ({
        url: `categories`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["pages"],
    }),
    getPage: build.query<GetPageResponse, string>({
      query: (id) => `page/${id}`,
      // providesTags: ["pages"],
    }),
  }),
});

export const { useUpdatePageMutation, useGetPageQuery } = api;
