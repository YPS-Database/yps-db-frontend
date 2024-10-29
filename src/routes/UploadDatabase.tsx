import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import Dropzone from "react-dropzone";
import {
  useApplyDbUpdateMutation,
  useCheckUploadNewDbMutation,
} from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useAppSelector } from "../app/store";
import { useEffect, useState } from "react";

function UploadDatabase() {
  const user = useAppSelector((state) => state.userProfile);
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

  // ensure applyChanges is false if we have an error
  useEffect(() => {
    if (applyChanges && (checkErrorMsg != "" || applyErrorMsg != "")) {
      setApplyChanges(false);
    }
  }, [applyChanges, checkErrorMsg, applyErrorMsg]);

  return (
    <>
      {(isLoadingCheck || isLoadingApply) && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red flex w-full flex-col rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Upload new database</h2>
          <p>
            Hi there, this is where you can upload a new database file. Rows in
            the database file with an empty title are skipped.
          </p>
          <p className="mt-2">
            If you have any trouble, please reach out to{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> for
            assistance! Please attach the xlsx file you're trying to upload.
          </p>
          <hr className="my-4 rounded border-2 border-rustyRed-100" />
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length < 1) {
                console.log("We didn't get any files");
                return;
              }
              if (applyChanges && checkErrorMsg === "") {
                applyDbUpdate({ token: user.token, db: acceptedFiles[0] });
              } else {
                checkDbUpdate({ token: user.token, db: acceptedFiles[0] });
              }
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
          {checkDbData && (
            <div className="mt-2 text-center text-green-600">
              <p className="font-semibold">New database:</p>
              <p>
                {checkDbData.total_entries} total entries in new file, with{" "}
                {checkDbData.new_entries} brand new entries.
              </p>
            </div>
          )}
          {applyDbData && (
            <div className="mt-2 text-center text-green-600">
              <p className="font-semibold">New database update applied:</p>
              <p>{JSON.stringify(applyDbData)}</p>
            </div>
          )}
          {(checkError || applyError) && (
            <div className="mt-2 text-center text-red-600">
              <p>Could not upload new database.</p>
              {checkErrorMsg && <p>{checkErrorMsg}</p>}
              {applyErrorMsg && <p>{applyErrorMsg}</p>}
            </div>
          )}
          {(checkDbData || applyChanges) && (
            <>
              <hr className="my-4 rounded border-2 border-rustyRed-100" />
              <div className="text-center">
                <p>
                  To apply the changes, click this checkbox and then re-upload
                  the exact same file:
                </p>
                <p>
                  <label htmlFor="upload-new-database-file-check">
                    I want to apply the next uploaded file:
                  </label>
                  <input
                    type="checkbox"
                    className="ml-2"
                    id="upload-new-database-file-check"
                    checked={applyChanges}
                    onChange={(e) => setApplyChanges(e.currentTarget.checked)}
                  />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default UploadDatabase;
