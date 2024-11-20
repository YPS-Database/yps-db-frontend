import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { useUploadEntryFilesListMutation } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { parseError } from "../app/utilities";

const jsonFileFormat = `
{
  "itemID1": ["filename.pdf", "filename2.pdf"],
  "itemID2": ["filename.pdf", "filename2.pdf"]
}
`.trim();

function ImportFileList() {
  const user = useAppSelector((state) => state.userProfile);
  const [importFiles, setImportFiles] = useState<File[]>([]);

  const [uploadNewEntriesFileList, { data, isLoading, error }] =
    useUploadEntryFilesListMutation();

  const canUpload = importFiles.length == 1;

  const uploadErrorMessage = parseError(error);

  // make sure the user is a superuser
  if (!user.loggedIn || user.level !== "superuser") {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div className="flex justify-center border-b border-b-happyRed bg-boxBg px-5 pb-7 pt-6">
        <div className="flex flex-col gap-1">
          <p>
            Hi there! Use this page to import a JSON list of files to be added
            to items, from the S3 bucket. The format is:
          </p>
          <pre className="mt-1.5 pl-3 text-sm">{jsonFileFormat}</pre>
          <p>
            where each item file is located inside the item's specific folder{" "}
            <code className="text-sm">(UPLOAD_KEY_PREFIX/items/12345/)</code>
          </p>
        </div>
      </div>
      <div
        id="content"
        className="mb-8 mt-4 flex flex-col items-start gap-3 px-10"
      >
        <div className="hover-yellow flex w-full flex-col rounded-lg bg-boxBg px-8 pb-7 pt-5">
          <h2 className="mb-3 text-xl">File list</h2>
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length != 1) {
                console.log("Incorrect number of files");
                return;
              }

              setImportFiles(acceptedFiles);
            }}
            accept={{ "application/json": [".json"] }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="rounded-lg border-rustyRed-200 bg-slate-200 p-5"
              >
                <div className="rounded bg-boxBg p-5 text-center">
                  <input {...getInputProps()} />
                  <p>
                    Drag and drop the new import file here, or click to select
                    the import file.
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
          {importFiles.length == 1 && (
            <div className="mt-2.5 flex justify-center gap-3">
              {importFiles[0].name}
            </div>
          )}
          <div className="mt-3 flex justify-center gap-3">
            <button
              className={`rounded px-5 py-3 text-white transition-colors ${canUpload ? "bg-blue-900 hover:bg-blue-950" : "bg-slate-900 opacity-60"}`}
              disabled={!canUpload}
              onClick={async () => {
                if (importFiles.length === 1) {
                  // load json and pass it
                  const entries = JSON.parse(await importFiles[0].text());
                  console.log(entries);

                  uploadNewEntriesFileList({
                    token: user.token,
                    entries,
                  });
                }
              }}
            >
              Upload database
            </button>
          </div>
        </div>

        {(data || uploadErrorMessage) && (
          <div className="hover-green flex w-full flex-col rounded-lg bg-boxBg px-8 pb-7 pt-5">
            <h2 className="mb-3 text-xl">Upload details</h2>
            {data && data.ok && (
              <p className="font-semibold">
                New file list successfully applied
              </p>
            )}
            {uploadErrorMessage && (
              <div className="mt-2 flex justify-center">
                <div>
                  <p className="font-semibold">
                    Error while uploading new file list:
                  </p>
                  <p className="text-red-600">{uploadErrorMessage}</p>
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

export default ImportFileList;
