// export type TagMap = Record<string, string[]>;

// export type Tag = {
//   id: string;
//   name: string;
//   values: string[];
//   id2: number;
//   tags?: TagMap;
// };

export type SearchEntry = {
  id: string;
  title: string;
  authors: string;
  year: string;
  document_type: string;
  available_languages: string[];
  language: string;
};
