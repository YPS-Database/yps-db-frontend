import deepmerge from "deepmerge";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface Props {
  classes?: string;
  content: string | undefined;
}

function YPSMarkdown({ content, classes }: Props) {
  return (
    <Markdown
      className={`markdown-page-content ${classes || ""}`}
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
      {content}
    </Markdown>
  );
}

export default YPSMarkdown;
