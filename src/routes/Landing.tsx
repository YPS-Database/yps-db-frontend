import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";

function Landing() {
  return (
    <>
      <TheHeader />
      <div id="content" className="flex gap-3 my-8 items-start flex-col px-10">
        <div className="rounded-lg bg-boxBg hover-red w-full py-6 px-8">
          <h2 className="text-xl">Catalogue search</h2>
          <TheSearchBar defaultValue=""/>
        </div>
        <div className="rounded-lg bg-boxBg hover-yellow w-full py-6 px-8">
          <h2 className="text-xl">Browse by</h2>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Landing;
