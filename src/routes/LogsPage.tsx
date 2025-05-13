import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useGetLogsQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useAppSelector } from "../app/store";
import LogLineEntry from "../components/LogLineEntry";
import { useState } from "react";
import Pagination from "../components/Pagination";

function LogsPage() {
  const user = useAppSelector((state) => state.userProfile);

  const [page, setPage] = useState(0);

  const { data, isLoading } = useGetLogsQuery({
    token: user.token,
    page,
  });

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red flex w-full flex-col rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Logs</h2>
          <hr className="my-4 rounded border-2 border-rustyRed-100" />
          <div className="mx-auto mb-3 mt-3 flex">
            <Pagination
              totalPages={data && data.logs ? page + 1 : page}
              currentPage={page}
              onPageSelected={(newPage) => {
                setPage(newPage);
              }}
            />
          </div>
          <div className="mx-auto flex w-[66em] max-w-full items-start gap-4 px-6">
            <div className="flex flex-1 flex-col gap-4">
              {data &&
                data.logs &&
                data.logs.map((entry) => (
                  <LogLineEntry
                    id={entry.id}
                    ts={entry.ts}
                    level={entry.level}
                    event={entry.event}
                    message={entry.message}
                    data={entry.data}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default LogsPage;
