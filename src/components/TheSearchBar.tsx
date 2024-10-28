import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface Props {
  defaultValue: string;
  defaultContext?: string;
  defaultLanguage?: string;
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
  onSearch,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [searchContext, setSearchContext] = useState(defaultContext || "all");
  const [language, setLanguage] = useState(defaultLanguage || "all");
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

  return (
    <form
      className="mx-auto flex w-[55em] max-w-full items-center justify-center gap-3"
      onSubmit={search}
    >
      <div className="flex flex-1 overflow-hidden rounded-lg border border-slate-400">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <FeatherIcon icon="search" size="18" />
          <input
            placeholder="Search for…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow"
          />
        </div>
        <select
          className="mr-1 border-l border-l-slate-400 bg-boxBg py-1 pl-3 pr-1.5"
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
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg border border-slate-400 px-3 py-1"
      >
        Submit
      </button>
    </form>
  );
}

export default TheSearchBar;
