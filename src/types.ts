// export type TagMap = Record<string, string[]>;

// export type Tag = {
//   id: string;
//   name: string;
//   values: string[];
//   id2: number;
//   tags?: TagMap;
// };

export type LogLine = {
  id: number;
  ts: string;
  level: string;
  event: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type SearchEntry = {
  id: string;
  title: string;
  authors: string;
  start_date: string;
  end_date: string;
  document_type: string;
  available_languages: string[];
  language: string;
};

export type SearchFilterValue = {
  value: string;
  count: number;
};

export type SearchFilter = {
  key: string;
  values: SearchFilterValue[];
};
