import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import { useGetDbFilesQuery, useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import YPSMarkdown from "../components/YPSMarkdown";

function DataPage() {
  const { data: pageData, isLoading: isLoadingPage } = useGetPageQuery("data");
  const { data: dbFilesData, isLoading: isLoadingDbFiles } =
    useGetDbFilesQuery();

  return (
    <>
      {(isLoadingPage || isLoadingDbFiles) && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 mt-1 text-2xl font-bold">Dataset</h2>
          <div>
            <YPSMarkdown content={pageData?.markdown} />
          </div>
          <div className="mt-1.5">
            {dbFilesData &&
              dbFilesData.files.map((e) => (
                <a className="block" href={e.url}>
                  {e.filename}
                </a>
              ))}
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default DataPage;
