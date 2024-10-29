import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import Dropzone from "react-dropzone";
import { useCheckUploadNewDbMutation } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useAppSelector } from "../app/store";

function UploadDatabase() {
  const user = useAppSelector((state) => state.userProfile);
  const [checkDb, { isLoading: isLoadingCheck, error: checkError }] =
    useCheckUploadNewDbMutation();

  const errorMsg = checkError
    ? "error" in checkError
      ? checkError.error
      : JSON.stringify("data" in checkError ? checkError.data : {})
    : "";

  console.log("error message:", errorMsg);

  return (
    <>
      {isLoadingCheck && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red flex w-full flex-col rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Upload new database</h2>
          <p>Hi there, this is where you can upload a new database file.</p>
          <p className="mt-2">
            If you have any trouble, please reach out to{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> for
            assistance!
          </p>
          <hr className="my-4 rounded border-2 border-rustyRed-100" />
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length < 1) {
                console.log("We didn't get any files");
                return;
              }
              console.log(acceptedFiles);
              checkDb({ token: user.token, db: acceptedFiles[0] });
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
          {checkError && (
            <div className="mt-2 text-center text-red-600">
              <p>Could not upload new database.</p>
              {errorMsg && <p>{errorMsg}</p>}
            </div>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default UploadDatabase;
