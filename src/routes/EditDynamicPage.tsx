import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useEditPageMutation, useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import YPSMarkdown from "../components/YPSMarkdown";

interface Props {
  title: string;
  slug: string;
}

function EditDynamicPage({ title, slug }: Props) {
  const user = useAppSelector((state) => state.userProfile);

  const { data, isLoading: isLoadingInitialInfo } = useGetPageQuery(slug);
  const [editPage, { isLoading: isLoadingMutation, error: editError }] =
    useEditPageMutation();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }
    setContent(data.markdown);
  }, [data]);

  return (
    <>
      {(isLoadingInitialInfo || isLoadingMutation) && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red flex w-full flex-col rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">{title}</h2>
          <p>
            Hi there, this is where you can edit page content. Page content is
            written using{" "}
            <a href="https://www.markdownguide.org/basic-syntax/">Markdown</a>,
            a basic formatting syntax.
          </p>
          <p className="mt-2">
            If you have any trouble, please reach out to{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> for
            assistance!
          </p>
          <hr className="my-4 rounded border-2 border-rustyRed-100" />
          <div className="flex flex-col gap-4 md:flex-row">
            <textarea
              className="min-h-[10rem] flex-1 rounded border border-slate-400 px-2.5 py-1"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            <div className="flex-1">
              <YPSMarkdown content={content} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-lg border border-slate-400 px-3 py-1"
              onClick={() => {
                editPage({
                  token: user.token,
                  id: slug,
                  content,
                  google_form_id: "",
                });
              }}
            >
              Save page content
            </button>
          </div>
          {editError && (
            <div className="mt-2 text-center text-red-600">
              Could not save page content.
            </div>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default EditDynamicPage;
