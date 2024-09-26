import { useState } from "react";

import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";
import SearchEntry from "../components/SearchEntry";
import Pagination from "../components/Pagination";

function Search() {
  const [page, setPage] = useState(1);

  return (
    <>
      <TheHeader />
      <div id="content" className="mb-8 flex flex-col gap-3">
        <div className="flex items-center border-b border-b-happyRed bg-boxBg px-5 py-3">
          <TheSearchBar defaultValue="Some value here" />
        </div>
        <div className="mx-auto mb-0.5 mt-3 flex w-[61em] max-w-full items-end justify-between px-8">
          <span className="text-sm">Results: 45&ndash;60 of 130</span>
          <Pagination
            totalPages={9}
            currentPage={page}
            onPageSelected={(newPage) => {
              setPage(newPage);
            }}
          />
          <span className="invisible">Pad for center \o/</span>
        </div>
        <div className="mx-auto flex w-[66em] max-w-full items-start gap-3">
          <div className="flex flex-col gap-4 px-5">
            <SearchEntry
              id="1"
              title="Mapping a Sector: Bridging the Evidence Gap on Youth-Driven Peacebuilding: Findings of the Global Survey of Youth-Led Organisations Working on Peace and Security"
              author="UNOY Peacebuilders, Search for Common Ground"
              year="2017"
              entryType="Consultation Report"
              languages={["English"]}
              regions={[]}
            />
            <SearchEntry
              id="2"
              title="Meeting Report: Youth, Peace, and Security in the Arab States Region:
A Consultation and High-level Dialogue"
              author="Altiok, Ali: Secretariat for the Progress Study on Youth, Peace and Security"
              year="2016"
              entryType="Consultation Report"
              languages={["English"]}
              regions={[]}
            />
            <SearchEntry
              id="3"
              title="Validation Consultation with Youth for the Progress Study on Youth, Peace & Security"
              author="Dag Hammarskjöld Foundation"
              year="2017"
              entryType="Concept Note"
              languages={["English", "French", "German"]}
              regions={[]}
            />
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
