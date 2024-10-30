import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import logoLight from "../assets/logoLight.png";
import { LinkList } from "../app/internalLinks";
import { useAppDispatch, useAppSelector } from "../app/store";
import { nextColourMode } from "../app/preferencesSlice";

function TheHeader() {
  const dispatch = useAppDispatch();
  const colourMode = useAppSelector((state) => state.preferences.colourMode);
  const user = useAppSelector((state) => state.userProfile);

  const displayColourModeSwitcher = false;

  return (
    <header className="sticky top-0">
      <div className="flex items-center justify-between bg-whiteIce-700 px-10 py-1 dark:bg-whiteIce-700">
        <Link to="/" className="z-10 flex items-center gap-3 px-2 py-2">
          <img src={logoLight} alt="YPS Database logo" className="h-14" />
        </Link>
        <div className="z-10 flex gap-2 text-slate-100">
          {displayColourModeSwitcher && (
            <button
              className="rounded-lg border-2 border-solid border-whiteIce-500 bg-whiteIce-600 bg-opacity-50 p-2.5 text-slate-100"
              onClick={() => {
                dispatch(nextColourMode());
              }}
            >
              <FeatherIcon
                icon={
                  colourMode === "light"
                    ? "sun"
                    : colourMode === "dark"
                      ? "moon"
                      : "monitor"
                }
              />
            </button>
          )}
          <Link
            to="/"
            className="rounded-lg border-2 border-solid border-whiteIce-500 bg-whiteIce-600 bg-opacity-50 p-2.5 text-slate-100"
          >
            <FeatherIcon icon="search" />
          </Link>
          {(user.level === "admin" || user.level === "superuser") && (
            <Link
              to="admin"
              className="rounded-lg border-2 border-solid border-whiteIce-500 bg-whiteIce-600 bg-opacity-50 p-2.5 text-slate-100"
            >
              <FeatherIcon icon="settings" />
            </Link>
          )}
        </div>
      </div>
      <nav className="z-10 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 bg-whiteIce-800 px-10 py-2 text-sm dark:bg-whiteIce-900">
        {LinkList.map((l, i) => (
          <Link to={l.path} className="z-20 flex items-center gap-1.5" key={i}>
            <FeatherIcon icon={l.icon} size="18" />
            {l.name}
          </Link>
        ))}
        {(user.level === "admin" || user.level === "superuser") && (
          <Link to="/admin" className="z-20 flex items-center gap-1.5">
            <FeatherIcon icon="settings" size="18" />
            Admin dashboard
          </Link>
        )}
      </nav>
    </header>
  );
}

export default TheHeader;
