import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchEntry } from "../types";

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

interface BrowseByFieldsResponse {
  values: Map<string, string[]>;
}

interface SearchEntriesRequest {
  query: string;
  searchContext: string;
  language: string;
  page: number;
}

interface SearchEntriesResponse {
  entries: SearchEntry[];
  total_pages: number;
}

interface OkResponse {
  ok: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_YPSDB_API,
  }),
  tagTypes: ["pages", "entries", "browsebyfields"],
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

    // entries
    //
    getBrowseByFields: build.query<BrowseByFieldsResponse, void>({
      query: () => `browseby`,
      providesTags: ["browsebyfields"],
    }),
    searchEntries: build.query<SearchEntriesResponse, SearchEntriesRequest>({
      query: ({ query, searchContext, language, page }) => ({
        url: `search`,
        method: "GET",
        params: {
          query,
          queryContext: searchContext,
          language,
          page,
        },
      }),
    }),
  }),
});

export const {
  useUpdatePageMutation,
  useGetPageQuery,
  useGetBrowseByFieldsQuery,
  useSearchEntriesQuery,
} = api;
