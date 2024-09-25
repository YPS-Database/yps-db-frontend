import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";

function Search() {
  return (
    <>
      <TheHeader />
      <div id="content" className="flex gap-3 mb-8 flex-col">
        <div className="p-3 flex items-center bg-boxBg border-b border-b-happyRed">
          <TheSearchBar defaultValue="Some value here" />
        </div>
        <div className="flex flex-col gap-3 items-start px-10">
          <div className="rounded-lg bg-boxBg hover-yellow w-full py-6 px-8">
            <h2 className="text-xl">Browse by</h2>
          </div>
          <div className="rounded-lg bg-boxBg hover-green w-full py-6 px-8">
            <h2 className="text-xl">Browse by</h2>
          </div>
          <div className="rounded-lg bg-boxBg hover-blue w-full py-6 px-8">
            <h2 className="text-xl">Browse by</h2>
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Search;
