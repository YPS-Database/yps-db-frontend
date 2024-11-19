import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useDeleteDbMutation, useGetDbFilesQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import FeatherIcon from "feather-icons-react";
import { useAppSelector } from "../app/store";

function ManageDatabases() {
  const user = useAppSelector((state) => state.userProfile);
  const { data: dbFilesData, isLoading: isLoadingDbFiles } =
    useGetDbFilesQuery();

  const [deleteDbFile, { isLoading: isLoadingDelete, error: deleteError }] =
    useDeleteDbMutation();

  const deleteErrorMsg = deleteError
    ? "error" in deleteError
      ? deleteError.error
      : JSON.stringify("data" in deleteError ? deleteError.data : {})
    : "";

  return (
    <>
      {(isLoadingDbFiles || isLoadingDelete) && <TheLoadingModal />}
      <TheHeader />
      <div className="flex justify-center border-b border-b-happyRed bg-boxBg px-5 pb-7 pt-6">
        <div className="flex flex-col gap-1">
          <p>
            Hi there, this is where you can remove unused database files. Note,
            this only removes the link from the 'dataset' page, but the file
            will still exist on the backend in case it's needed later.
          </p>
          <p>
            If you have any trouble, please reach out to{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> for
            assistance!
          </p>
        </div>
      </div>
      <div
        id="content"
        className="mb-8 mt-4 flex flex-col items-start gap-3 px-10"
      >
        <div className="hover-yellow flex w-full flex-col rounded-lg bg-boxBg px-8 pb-6 pt-5">
          <h2 className="mb-1 text-xl">Databases</h2>
          <div className="flex flex-col gap-1">
            {dbFilesData &&
              dbFilesData.files.map((e, i) => (
                <div className="flex gap-1.5">
                  <a className="block" href={e.url}>
                    {e.filename}
                  </a>
                  {i !== 0 && (
                    <button
                      className="text-happyRed"
                      title={`Delete "${e.filename}"`}
                      onClick={() => {
                        if (window.confirm(`Delete "${e.filename}"?`)) {
                          deleteDbFile({
                            token: user.token,
                            db: e.id,
                          });
                        }
                      }}
                    >
                      <FeatherIcon icon="x" size={18} />
                    </button>
                  )}
                </div>
              ))}
          </div>
          {deleteError && (
            <div className="mt-4 flex justify-center">
              <div>
                <p className="font-semibold">Error while deleting db file:</p>
                <p className="text-red-600">{deleteErrorMsg}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default ManageDatabases;
