import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import { useGetDbFilesQuery, useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          <h2 className="mb-2 text-xl">Dataset</h2>
          <div>
            <Markdown
              className="markdown-page-content"
              remarkPlugins={[remarkGfm]}
            >
              {pageData?.markdown}
            </Markdown>
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
