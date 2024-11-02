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

interface UploadDbRequest {
  token: string;
  db: File;
}

interface CheckUploadNewDbResponse {
  total_entries: number;
  new_entries: number;
}

interface BrowseByFieldsResponse {
  values: Map<string, string[]>;
}

interface SearchEntriesRequest {
  query: string;
  searchContext: string;
  language: string;
  page: number;
  filterKey: string;
  filterValue: string;
  sortBy: string;
}

interface SearchEntriesResponse {
  page: number;
  total_pages: number;
  total_entries: number;
  start_entry: number;
  end_entry: number;
  entries: SearchEntry[];
}

interface EntryFile {
  filename: string;
  url: string;
}

interface AlternateEntry {
  language: string;
  title: string;
  files: EntryFile[];
}

interface GetEntryResponse {
  entry: {
    id: string;
    title: string;
    authors: string;
    url: string;
    orgs: string[];
    org_doc_id: string;
    org_type: string;
    entry_type: string;
    abstract: string;
    youth_led: string;
    youth_led_details: string;
    keywords: string[];
    start_date: string;
    end_date: string;
    language: string;
    files: EntryFile[];
  };
  alternates: Map<string, AlternateEntry>;
}

interface GetDbFilesResponse {
  files: {
    filename: string;
    url: string;
  }[];
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
  tagTypes: ["pages", "entries", "dbs", "browsebyfields"],
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
    checkUploadNewDb: build.mutation<CheckUploadNewDbResponse, UploadDbRequest>(
      {
        query: ({ token, db }) => {
          const body = new FormData();
          body.append("db", db);
          return {
            url: `db`,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body,
            formData: true,
          };
        },
      },
    ),
    applyDbUpdate: build.mutation<CheckUploadNewDbResponse, UploadDbRequest>({
      query: ({ token, db }) => {
        const body = new FormData();
        body.append("db", db);
        return {
          url: `db`,
          params: {
            apply: true,
          },
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
          formData: true,
        };
      },
      invalidatesTags: ["dbs", "browsebyfields", "entries"],
    }),
    getDbFiles: build.query<GetDbFilesResponse, void>({
      query: () => `dbs`,
      providesTags: ["dbs"],
    }),
    getBrowseByFields: build.query<BrowseByFieldsResponse, void>({
      query: () => `browseby`,
      providesTags: ["browsebyfields"],
    }),
    searchEntries: build.query<SearchEntriesResponse, SearchEntriesRequest>({
      query: ({
        query,
        searchContext,
        language,
        page,
        filterKey,
        filterValue,
        sortBy,
      }) => ({
        url: `search`,
        method: "GET",
        params: {
          query,
          queryContext: searchContext,
          language,
          filterKey,
          filterValue,
          page,
          sort: sortBy,
        },
      }),
    }),
    getEntry: build.query<GetEntryResponse, string>({
      query: (id) => `entry/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useEditPageMutation,
  useGetPageQuery,
  useApplyDbUpdateMutation,
  useCheckUploadNewDbMutation,
  useGetDbFilesQuery,
  useGetBrowseByFieldsQuery,
  useSearchEntriesQuery,
  useGetEntryQuery,
} = api;
