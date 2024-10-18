import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

import { useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";

interface Props {
  slug: string;
}

function DynamicPage({ slug }: Props) {
  const { data, isLoading } = useGetPageQuery(slug);

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Dynamic page here</h2>
          <div>Data: {data?.html}</div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default DynamicPage;
