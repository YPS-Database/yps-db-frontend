import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import { useGetEntryQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { languageCodeToName } from "../app/utilities";

type Params = {
  entryId: string;
};

function EntryPage() {
  const { entryId } = useParams<Params>();

  const { data, isLoading } = useGetEntryQuery(entryId || "");

  if (!entryId) {
    return <NotFound />;
  }
  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-center gap-3 px-10">
        <div className="hover-red w-[58rem] max-w-full rounded-lg bg-boxBg px-8 py-6">
          {data && (
            <>
              <h2 className="mb-2 text-lg">{data.entry.title}</h2>
              <div className="md:grid-cols-entryParams mt-3 flex flex-col gap-x-5 gap-y-1.5 text-sm md:grid">
                <div className="font-bold md:text-right">Author(s):</div>
                <div>{data.entry.authors}</div>
                <div className="font-bold md:text-right">Type:</div>
                <div>{data.entry.entry_type}</div>
                <div className="font-bold md:text-right">Year:</div>
                <div>
                  {new Date(data.entry.start_date).getFullYear() == 1
                    ? "Undated"
                    : new Date(data.entry.start_date).getFullYear().toString()}
                </div>
                <div className="font-bold md:text-right">
                  Youth-led or authored:
                </div>
                <div>{data.entry.youth_led_details}</div>
                <div className="font-bold md:text-right">YPSDB ID:</div>
                <div>{data.entry.id}</div>
                <div className="font-bold md:text-right">Language:</div>
                <div>{languageCodeToName(data.entry.language)}</div>
                <div className="font-bold md:text-right">
                  Available languages:
                </div>
                <div>
                  {[data.entry.language]
                    .concat(
                      Object.values(data.alternate_languages).map(
                        (e) => e.language,
                      ),
                    )
                    .map((lang) => languageCodeToName(lang))
                    .sort()
                    .join(", ")}
                </div>
                <div className="font-bold md:text-right">Keywords:</div>
                <div>{data.entry.keywords.join("; ")}</div>
              </div>
              <hr className="my-4 rounded border-2 border-rustyRed-100" />
              <div className="text-sm">{data.entry.abstract}</div>
              <div className="mt-2 text-sm">
                URL:{" "}
                <a target="_blank" href={data.entry.url}>
                  {data.entry.url}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default EntryPage;