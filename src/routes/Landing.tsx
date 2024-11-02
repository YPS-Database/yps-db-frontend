import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";
import { useGetBrowseByFieldsQuery, useGetPageQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import React from "react";
import { improveFilterName } from "../app/utilities";
import { createSearchParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Landing() {
  const { data: pageData, isLoading: isLoadingGetPage } =
    useGetPageQuery("home");
  const { data: browseBy, isLoading: isLoadingBrowseByFields } =
    useGetBrowseByFieldsQuery();

  return (
    <>
      {(isLoadingGetPage || isLoadingBrowseByFields) && <TheLoadingModal />}
      <TheHeader />
      <div className="flex justify-center border-b border-b-happyRed bg-boxBg px-5 pb-7 pt-6">
        <Markdown
          className="markdown-page-content w-[60em]"
          remarkPlugins={[remarkGfm]}
        >
          {pageData?.markdown}
        </Markdown>
      </div>
      <div
        id="content"
        className="mb-8 mt-6 flex flex-col items-stretch gap-3 px-10"
      >
        <div className="hover-yellow w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-lg">Catalogue search</h2>
          <TheSearchBar defaultValue="" />
        </div>
        <div className="hover-green w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="text-lg">Browse by</h2>
          <div className="mt-3 flex flex-col gap-x-5 gap-y-3 md:grid md:grid-cols-browseBy">
            {browseBy &&
              Object.entries(browseBy.values).map((info, i) => {
                return (
                  <React.Fragment key={i}>
                    <div>{improveFilterName(info[0])}</div>
                    <div className="flex flex-wrap gap-x-4">
                      {info[1].map((value: string) => [
                        <Link
                          key={value}
                          to={{
                            pathname: "/search",
                            search: createSearchParams([
                              ["filter_key", info[0]],
                              ["filter_value", value],
                            ]).toString(),
                          }}
                        >
                          {value}
                        </Link>,
                      ])}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Landing;
