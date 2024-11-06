import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import Dropzone from "react-dropzone";
import {
  useApplyDbUpdateMutation,
  useCheckUploadNewDbMutation,
  useGetLatestDbQuery,
} from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useAppSelector } from "../app/store";
import { useEffect, useState } from "react";

function UploadDatabase() {
  const user = useAppSelector((state) => state.userProfile);
  const [dbFiles, setDbFiles] = useState<File[]>([]);
  const [overwrite, setOverwrite] = useState(false);

  const { data: latestDbData, isLoading: isLoadingLatestDb } =
    useGetLatestDbQuery();
  const [
    checkDbUpdate,
    { data: checkDbData, isLoading: isLoadingCheck, error: checkError },
  ] = useCheckUploadNewDbMutation();
  const [
    applyDbUpdate,
    { data: applyDbData, isLoading: isLoadingApply, error: applyError },
  ] = useApplyDbUpdateMutation();

  const [applyChanges, setApplyChanges] = useState(false);

  const checkErrorMsg = checkError
    ? "error" in checkError
      ? checkError.error
      : JSON.stringify("data" in checkError ? checkError.data : {})
    : "";
  const applyErrorMsg = applyError
    ? "error" in applyError
      ? applyError.error
      : JSON.stringify("data" in applyError ? applyError.data : {})
    : "";

  const canUpload =
    dbFiles.length == 1 &&
    checkDbData &&
    !checkError &&
    (!checkDbData.file_already_exists || overwrite);

  // ensure applyChanges is false if we have an error
  useEffect(() => {
    if (applyChanges && (checkErrorMsg != "" || applyErrorMsg != "")) {
      setApplyChanges(false);
    }
  }, [applyChanges, checkErrorMsg, applyErrorMsg]);

  return (
    <>
      {(isLoadingLatestDb || isLoadingCheck || isLoadingApply) && (
        <TheLoadingModal />
      )}
      <TheHeader />
      <div className="flex justify-center border-b border-b-happyRed bg-boxBg px-5 pb-7 pt-6">
        <div className="flex flex-col gap-1">
          <p>
            Hi there, this is where you can upload a new database file. Rows in
            the database file with an empty title are skipped.
          </p>
          <p>
            If you have any trouble, please reach out to{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> for
            assistance! Please attach the xlsx file you're trying to upload.
          </p>
        </div>
      </div>
      <div
        id="content"
        className="mb-8 mt-4 flex flex-col items-start gap-3 px-10"
      >
        <div className="hover-yellow flex w-full flex-col rounded-lg bg-boxBg px-8 pb-6 pt-5">
          <h2 className="mb-1 text-xl">Current database</h2>
          {latestDbData && (
            <div className="flex flex-col gap-0.5">
              <span>Number of entries: {latestDbData.number_of_entries}</span>
              <span>
                Number of languages: {latestDbData.number_of_languages}
              </span>
            </div>
          )}
        </div>

        <div className="hover-green flex w-full flex-col rounded-lg bg-boxBg px-8 pb-7 pt-5">
          <h2 className="mb-3 text-xl">New database</h2>
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length != 1) {
                console.log("Incorrect number of files");
                return;
              }

              setDbFiles(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="rounded-lg border-rustyRed-200 bg-slate-200 p-5"
              >
                <div className="rounded bg-boxBg p-5 text-center">
                  <input {...getInputProps()} />
                  <p>
                    Drag and drop the new database file here, or click to select
                    the database file.
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
          {dbFiles.length == 1 && (
            <div className="mt-2.5 flex justify-center gap-3">
              {dbFiles[0].name}
            </div>
          )}
          <div className="mt-3 flex justify-center gap-3">
            <button
              className="rounded bg-blue-900 px-5 py-3 text-white transition-colors hover:bg-blue-950"
              onClick={() => {
                if (dbFiles.length === 1) {
                  checkDbUpdate({ token: user.token, db: dbFiles[0] });
                }
              }}
            >
              Check database
            </button>
            <button
              className={`rounded px-5 py-3 text-white transition-colors ${canUpload ? "bg-blue-900 hover:bg-blue-950" : "bg-slate-900 opacity-60"}`}
              disabled={!canUpload}
              onClick={() => {
                if (dbFiles.length === 1) {
                  applyDbUpdate({
                    token: user.token,
                    db: dbFiles[0],
                    overwrite,
                  });
                }
              }}
            >
              Upload database
            </button>
          </div>
          {((checkDbData && checkDbData.file_already_exists) || overwrite) && (
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <input
                id="overwriteExistingDb"
                type="checkbox"
                checked={overwrite}
                onChange={(e) => setOverwrite(e.currentTarget.checked)}
              />
              <label htmlFor="overwriteExistingDb">Overwrite</label>
            </div>
          )}
        </div>

        {(checkDbData || checkError) && (
          <div className="hover-blue flex w-full flex-col rounded-lg bg-boxBg px-8 pb-7 pt-5">
            <h2 className="text-xl">Check details</h2>
            {checkDbData && (
              <>
                {checkDbData.file_already_exists && (
                  <p className="mb-1 font-semibold">
                    This database file already exists. Please rename the file or
                    ensure the 'Overwrite' checkbox is enabled.
                  </p>
                )}
                <p>{checkDbData.total_entries} total entries.</p>
                <p>{checkDbData.unmodified_entries} unmodified entries.</p>
                <p>{checkDbData.modified_entries} modified entries.</p>
                <p>{checkDbData.new_entries} new entries.</p>
                <p>{checkDbData.deleted_entries} deleted entries.</p>
                {checkDbData.nits && (
                  <>
                    <p className="mt-2 font-semibold">Possible errors:</p>
                    <div className="max-h-[10rem] overflow-y-auto rounded border border-slate-800 px-3 py-1.5">
                      {checkDbData.nits.map((nit, i) => (
                        <p key={i}>{nit}</p>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            {checkError && (
              <div className="mt-2 flex justify-center">
                <div>
                  <p className="font-semibold">
                    Error while checking new database:
                  </p>
                  <p className="text-red-600">{checkErrorMsg}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {(applyDbData || applyError) && (
          <div className="hover-purple flex w-full flex-col rounded-lg bg-boxBg px-8 pb-7 pt-5">
            <h2 className="mb-3 text-xl">Upload details</h2>
            {applyDbData && applyDbData.ok && (
              <p className="font-semibold">
                New database update successfully applied
              </p>
            )}
            {applyError && (
              <div className="mt-2 flex justify-center">
                <div>
                  <p className="font-semibold">
                    Error while uploading new database:
                  </p>
                  <p className="text-red-600">{applyErrorMsg}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <TheFooter />
    </>
  );
}

export default UploadDatabase;
