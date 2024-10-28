import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";
import { useGetBrowseByFieldsQuery } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import React from "react";

function Landing() {
  const { data: browseBy, isLoading } = useGetBrowseByFieldsQuery();

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Catalogue search</h2>
          <TheSearchBar defaultValue="" />
        </div>
        <div className="hover-yellow w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="text-xl">Browse by</h2>
          <div className="grid-cols-browseBy mt-3 grid gap-x-5 gap-y-3">
            {browseBy &&
              Object.entries(browseBy.values).map((info, i) => {
                return (
                  <React.Fragment key={i}>
                    <div>{info[0]}</div>
                    <div>
                      {info[1].map((value: string) => (
                        <span key={value} className="browseByLink">
                          {value}
                        </span>
                      ))}
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
