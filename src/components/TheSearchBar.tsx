import FeatherIcon from "feather-icons-react";
import { useMemo, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { languageCodeToName } from "../app/utilities";

interface Props {
  defaultValue: string;
  defaultContext?: string;
  defaultLanguage?: string;
  languages?: string[];
  onSearch?: (
    query: string,
    searchContext: string,
    searchLanguage: string,
  ) => void;
}

function TheSearchBar({
  defaultValue,
  defaultContext,
  defaultLanguage,
  languages = [],
  onSearch,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [searchContext, setSearchContext] = useState(defaultContext || "all");
  const [language, setLanguage] = useState(defaultLanguage || "en");
  const navigate = useNavigate();

  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (onSearch) {
      onSearch(value, searchContext, language);
    } else {
      navigate({
        pathname: "/search",
        search: createSearchParams({
          q: value,
          context: searchContext,
          lang: language,
        }).toString(),
      });
    }
  }

  const sortedLanguages = useMemo(() => {
    return [...languages]
      .filter((code) => Boolean(code) && code !== "all")
      .sort((a, b) => {
        if (a === "en") return -1;
        if (b === "en") return 1;

        const nameA = languageCodeToName(a);
        const nameB = languageCodeToName(b);
        return nameA.localeCompare(nameB);
      });
  }, [languages]);

  return (
    <form
      className="mx-auto flex w-[55em] max-w-full flex-col items-start justify-center gap-3 md:flex-row md:items-stretch"
      onSubmit={search}
    >
      <div className="flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-slate-400 sm:flex-row md:w-auto">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <FeatherIcon icon="search" size="18" />
          <input
            placeholder="Search for…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow py-1"
          />
        </div>
        <select
          className="border-t border-t-slate-400 bg-boxBg py-1 pl-3 pr-1.5 sm:mr-1 sm:border-l sm:border-t-0 sm:border-l-slate-400"
          value={searchContext}
          onChange={(e) => setSearchContext(e.target.value)}
        >
          <option value="all">Everything</option>
          <option value="title">Title</option>
          <option value="abstract">Abstract</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-400">
        <select
          className="mr-1 bg-boxBg py-1 pl-3 pr-1.5"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="all">All languages</option>
          {sortedLanguages.map((code) => (
            <option key={code} value={code}>
              {languageCodeToName(code)}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-lg bg-[#781a21] py-1 pl-2.5 pr-3.5 text-white"
      >
        <FeatherIcon icon="search" size="18" />
        <span className="pb-0.5">Search</span>
      </button>
    </form>
  );
}

export default TheSearchBar;
