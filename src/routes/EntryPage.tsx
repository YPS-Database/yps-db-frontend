import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import {
  AlternateEntry,
  useDeleteEntryFileMutation,
  useGetEntryQuery,
  useUploadEntryFileMutation,
} from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { createSearchParams, Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { languageCodeToName, parseError } from "../app/utilities";
import { useAppSelector } from "../app/store";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";

type LanguageEntryFile = {
  entry_id: string;
  language: string;
  filename: string;
  url: string;
};

type Params = {
  entryId: string;
};

function EntryPage() {
  const user = useAppSelector((state) => state.userProfile);

  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const [uploadLanguage, setUploadLanguage] = useState("");

  const { entryId } = useParams<Params>();

  const [
    uploadEntryFile,
    {
      // data: uploadEntryFileData,
      isLoading: isLoadingUpload,
      error: uploadError,
    },
  ] = useUploadEntryFileMutation();

  const uploadErrorMsg = parseError(uploadError);

  const [
    deleteEntryFile,
    {
      // data: uploadEntryFileData,
      isLoading: isLoadingDelete,
      error: deleteError,
    },
  ] = useDeleteEntryFileMutation();

  const deleteErrorMsg = parseError(deleteError);

  const { data, isLoading } = useGetEntryQuery(entryId || "");

  useEffect(() => {
    if (data && uploadLanguage === "") {
      setUploadLanguage(data.entry.id);
    }
  }, [data, uploadLanguage]);

  let allFiles: LanguageEntryFile[] = [];
  if (data) {
    allFiles = data.files.map((e) => {
      return {
        entry_id: data.entry.id,
        language: data.entry.language,
        filename: e.filename,
        url: e.url,
      };
    });
    for (const le of Object.entries(data.alternates)) {
      allFiles = allFiles.concat(
        (le[1] as AlternateEntry).files.map((e) => {
          return {
            entry_id: le[0],
            language: le[1].language,
            filename: e.filename,
            url: e.url,
          };
        }),
      );
    }
  }

  if (!entryId) {
    return <NotFound />;
  }

  return (
    <>
      {(isLoading || isLoadingUpload || isLoadingDelete) && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-center gap-3 px-10">
        {data && (
          <>
            <div className="hover-red w-[58rem] max-w-full rounded-lg bg-boxBg px-8 py-6">
              <h2 className="mb-2 text-lg">{data.entry.title}</h2>
              <div className="mt-3 flex flex-col gap-x-5 gap-y-1.5 text-sm md:grid md:grid-cols-entryParams">
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
                      Object.values(data.alternates).map((e) => e.language),
                    )
                    .map((lang) => languageCodeToName(lang))
                    .sort()
                    .join(", ")}
                </div>
                <div className="font-bold md:text-right">Regions:</div>
                <div className="flex flex-wrap gap-x-3.5 gap-y-0.5">
                  {data.entry.regions.map((value) => [
                    <Link
                      key={value}
                      to={{
                        pathname: "/search",
                        search: createSearchParams([
                          ["filter_key", "region"],
                          ["filter_value", value],
                        ]).toString(),
                      }}
                    >
                      {value}
                    </Link>,
                  ])}
                </div>
                <div className="font-bold md:text-right">Keywords:</div>
                <div className="flex flex-wrap gap-x-3.5 gap-y-0.5">
                  {data.entry.keywords.map((value) => [
                    <Link
                      key={value}
                      to={{
                        pathname: "/search",
                        search: createSearchParams([
                          ["filter_key", "keyword"],
                          ["filter_value", value],
                        ]).toString(),
                      }}
                    >
                      {value}
                    </Link>,
                  ])}
                </div>
              </div>
              <hr className="my-4 rounded border-2 border-rustyRed-100" />
              <div className="text-sm">{data.entry.abstract}</div>
              <div className="mt-2 text-sm">
                URL:{" "}
                <a target="_blank" href={data.entry.url}>
                  {data.entry.url}
                </a>
              </div>
            </div>
            <div className="hover-yellow w-[58rem] max-w-full rounded-lg bg-boxBg px-8 pb-8 pt-6">
              <h2 className="mb-2 text-lg">Files and documents</h2>
              <div className="mt-3.5 overflow-hidden rounded border border-happyYellow border-opacity-90 text-sm">
                {allFiles.map((e, i) => [
                  <div
                    key={i}
                    className={`flex gap-4 border-opacity-90 px-4 py-2.5 ${i > 0 ? "border-t border-t-happyYellow" : ""}`}
                  >
                    <div className="font-bold">
                      {languageCodeToName(e.language)}
                    </div>
                    <a href={e.url} className="flex-1">
                      {e.filename}
                    </a>
                    {user.loggedIn &&
                      (user.level === "admin" ||
                        user.level === "superuser") && (
                        <button
                          className="text-happyRed"
                          title={`Delete "${e.filename}"`}
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete "${e.filename}" from the database?`,
                              )
                            ) {
                              deleteEntryFile({
                                token: user.token,
                                id: e.entry_id,
                                filename: e.filename,
                              });
                            }
                          }}
                        >
                          <FeatherIcon icon="x" size={18} />
                        </button>
                      )}
                  </div>,
                ])}
                {allFiles.length < 1 && (
                  <div className="px-4 py-2.5">
                    No files are available for this item
                  </div>
                )}
              </div>
              {user.loggedIn &&
                (user.level === "admin" || user.level === "superuser") && (
                  <>
                    <div className="mt-4 flex items-center justify-center gap-x-4">
                      <Dropzone
                        maxFiles={1}
                        onDrop={(acceptedFiles) => {
                          if (acceptedFiles.length != 1) {
                            console.log("Incorrect number of files");
                            return;
                          }

                          setUploadFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className="rounded-lg border-rustyRed-200 bg-slate-200 p-5"
                          >
                            <div className="rounded bg-boxBg px-4 py-3 text-center">
                              <input {...getInputProps()} />
                              <p>
                                Drag and drop the new file here, or click to
                                select the file.
                              </p>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="entry-file-upload-language">
                          Language:
                        </label>
                        <select
                          className="mr-1 rounded border border-rustyRed-200 bg-boxBg py-1 pl-3 pr-1.5"
                          value={uploadLanguage}
                          onChange={(e) => setUploadLanguage(e.target.value)}
                        >
                          <option value={data.entry.id}>
                            {languageCodeToName(data.entry.language)}
                          </option>
                          {Object.entries(data.alternates).map((e) => [
                            <option key={e[0]} value={e[0]}>
                              {languageCodeToName(e[1].language)}
                            </option>,
                          ])}
                        </select>
                      </div>
                    </div>
                    {uploadFiles.length === 1 && (
                      <div className="mt-2 flex flex-col items-center gap-2">
                        <span>{uploadFiles[0].name}</span>
                        <button
                          className="rounded bg-blue-900 px-5 py-3 text-white transition-colors hover:bg-blue-950"
                          onClick={() => {
                            uploadEntryFile({
                              token: user.token,
                              id: uploadLanguage,
                              file: uploadFiles[0],
                            });
                            setUploadFiles([]);
                          }}
                        >
                          Upload file
                        </button>
                      </div>
                    )}
                    {uploadError && (
                      <div className="mt-4 flex justify-center">
                        <div>
                          <p className="font-semibold">
                            Error while uploading new file:
                          </p>
                          <p className="text-red-600">{uploadErrorMsg}</p>
                        </div>
                      </div>
                    )}
                    {deleteError && (
                      <div className="mt-4 flex justify-center">
                        <div>
                          <p className="font-semibold">
                            Error while deleting entry file:
                          </p>
                          <p className="text-red-600">{deleteErrorMsg}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
            <div className="hover-green w-[58rem] max-w-full rounded-lg bg-boxBg px-8 pb-8 pt-6">
              <h2 className="mb-2 text-lg">Alternate languages</h2>
              <div className="mt-3.5 overflow-hidden rounded border border-happyGreen border-opacity-90 text-sm">
                {Object.entries(data.alternates).map((e, i) => [
                  <div
                    key={e[0]}
                    className={`flex gap-4 border-opacity-90 px-4 py-2.5 ${i > 0 ? "border-t border-t-happyGreen" : ""}`}
                  >
                    <div className="font-bold">
                      {languageCodeToName(e[1].language)}
                    </div>
                    <Link to={`/entry/${e[0]}`}>{e[1].title}</Link>
                  </div>,
                ])}
                {Object.entries(data.alternates).length < 1 && (
                  <div className="px-4 py-2.5">
                    No other languages are available for this item
                  </div>
                )}
              </div>
            </div>
            <div className="hover-blue w-[58rem] max-w-full rounded-lg bg-boxBg px-8 pb-8 pt-6">
              <h2 className="mb-2 text-lg">Related entries</h2>
              <div className="mt-3.5 overflow-hidden rounded border border-happyBlue border-opacity-90 text-sm">
                {Object.entries(data.related).map((e, i) => [
                  <div
                    key={e[0]}
                    className={`flex gap-4 border-opacity-90 px-4 py-2.5 ${i > 0 ? "border-t border-t-happyBlue" : ""}`}
                  >
                    <div className="font-bold">#{e[0]}</div>
                    <Link to={`/entry/${e[0]}`}>{e[1]}</Link>
                  </div>,
                ])}
                {Object.entries(data.related).length < 1 && (
                  <div className="px-4 py-2.5">
                    No related entries are available for this item
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <TheFooter />
    </>
  );
}

export default EntryPage;
