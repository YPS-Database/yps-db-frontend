import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import { useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import deepmerge from "deepmerge";

interface Props {
  title: string;
  slug: string;
}

function DynamicPage({ title, slug }: Props) {
  const { data, isLoading } = useGetPageQuery(slug);

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 mt-1 text-2xl font-bold">{title}</h2>
          <div>
            <Markdown
              className="markdown-page-content"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                [
                  rehypeSanitize,
                  deepmerge(defaultSchema, {
                    attributes: { img: ["className", "style"] },
                  }),
                ],
              ]}
            >
              {data?.markdown}
            </Markdown>
            {data?.google_form_id && (
              <a className="mt-5 block" href={`${data?.google_form_id}`}>
                View submission form
              </a>
            )}
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default DynamicPage;
