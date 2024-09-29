import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheSearchBar from "../components/TheSearchBar";

function Landing() {
  return (
    <>
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Catalogue search</h2>
          <TheSearchBar defaultValue="" />
        </div>
        <div className="hover-yellow w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="text-xl">Browse by</h2>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Landing;
