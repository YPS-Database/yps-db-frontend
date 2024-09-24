import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

function NotFound() {
  return (
    <>
      <TheHeader />
      <div id="content" className="flex gap-3 my-8 items-start flex-col px-10">
        <div className="rounded-lg bg-boxBg hover-red w-full py-6 px-8">
          <h2 className="text-xl mb-1">404 - Page Not Found</h2>
          <p>Whoops! If this page is supposed to exist, please email <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a> with the URL you tried to access.</p>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default NotFound;
