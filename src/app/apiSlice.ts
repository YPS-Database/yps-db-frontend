import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchEntry } from "../types";

interface LoginRequest {
  password: string;
}

interface LoginResponse {
  token: string;
  level: "user" | "admin" | "superuser";
  exp: string;
}

interface EditPageRequest {
  token: string;
  id: string;
  content: string;
  google_form_id: string;
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

interface OkUpdatedTimeResponse {
  ok: boolean;
  updated: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_YPSDB_API,
  }),
  tagTypes: ["pages", "entries", "browsebyfields"],
  endpoints: (build) => ({
    // auth
    //
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ password }) => ({
        url: `auth`,
        method: "POST",
        body: {
          password,
        },
      }),
    }),

    // pages
    //
    editPage: build.mutation<OkUpdatedTimeResponse, EditPageRequest>({
      query: ({ token, id, content, google_form_id }) => ({
        url: `page/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          content,
          google_form_id,
        },
      }),
      invalidatesTags: ["pages"],
    }),
    getPage: build.query<GetPageResponse, string>({
      query: (id) => `page/${id}`,
      providesTags: ["pages"],
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
  useLoginMutation,
  useEditPageMutation,
  useGetPageQuery,
  useGetBrowseByFieldsQuery,
  useSearchEntriesQuery,
} = api;
