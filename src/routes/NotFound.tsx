import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

function NotFound() {
  return (
    <>
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-1 text-xl">404 - Page Not Found</h2>
          <p>
            Whoops! If this page is supposed to exist, please email{" "}
            <a href="mailto:daniel@danieloaks.net">daniel@danieloaks.net</a>{" "}
            with the URL you tried to access.
          </p>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default NotFound;
