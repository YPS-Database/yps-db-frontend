import { useState } from "react";

import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";
import SearchEntry from "../components/SearchEntry";
import Pagination from "../components/Pagination";
import { useSearchEntriesQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";

function Search() {
  // TODO: init this based on query string info
  const [textValue, setTextValue] = useState("Some value here");

  const [page, setPage] = useState(1);
  const { data, isLoading } = useSearchEntriesQuery({
    query: textValue,
    page: page,
  });

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="mb-8 flex flex-col gap-3">
        <div className="flex items-center border-b border-b-happyRed bg-boxBg px-5 py-3">
          <TheSearchBar
            defaultValue={textValue}
            onSearch={(query) => {
              setTextValue(query);
            }}
          />
        </div>
        <div className="mx-auto mb-0.5 mt-3 flex w-[61em] max-w-full items-end justify-between px-8">
          <span className="text-sm">Results: 45&ndash;60 of 130</span>
          <Pagination
            totalPages={data?.total_pages || 1}
            currentPage={page}
            onPageSelected={(newPage) => {
              setPage(newPage);
            }}
          />
          <span className="invisible">Pad for center \o/</span>
        </div>
        <div className="mx-auto flex w-[66em] max-w-full items-start gap-3">
          <div className="flex flex-col gap-4 px-5">
            {data &&
              data.entries.map((entry) => (
                <SearchEntry
                  id={entry.id}
                  title={entry.title}
                  author={entry.authors}
                  year={entry.year}
                  entryType={entry.document_type}
                  languages={entry.available_languages}
                  regions={[]}
                />
              ))}
          </div>
          <div className="hover-grey flex flex-col gap-4 rounded-lg bg-boxBg py-3.5 pl-5 pr-4">
            <div className="flex items-baseline gap-3">
              <label htmlFor="sortBy" className="whitespace-nowrap">
                Sort by
              </label>
              <select
                className="mr-1 flex-1 rounded-lg border border-slate-400 bg-boxBg py-1 pl-3 pr-1.5"
                id="sortBy"
              >
                <option>Relevance</option>
                <option>Year (newest first)</option>
                <option>Year (oldest first)</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Search;
