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
      <div id="content" className="flex gap-3 mb-8 flex-col">
        <div className="py-3 px-5 flex items-center bg-boxBg border-b border-b-happyRed">
          <TheSearchBar defaultValue="Some value here" />
        </div>
        <div className="flex w-[61em] max-w-full mx-auto justify-between mt-3 items-end mb-0.5 px-8">
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
        <div className="flex flex-col w-[66em] max-w-full mx-auto">
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
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Search;
