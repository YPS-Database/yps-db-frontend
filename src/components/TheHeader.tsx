import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import logo from "../assets/logo.png";
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
      <div className="flex items-center justify-between bg-whiteIce-100 px-10 py-1 dark:bg-whiteIce-700">
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <img src={logo} alt="YPS Database logo" className="h-14" />
        </Link>
        <div className="flex gap-2 text-slate-900 dark:text-slate-100">
          {displayColourModeSwitcher && (
            <button
              className="rounded-lg border-2 border-solid border-whiteIce-200 bg-whiteIce-50 p-2.5 dark:border-whiteIce-800 dark:bg-whiteIce-600"
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
            className="rounded-lg border-2 border-solid border-whiteIce-200 bg-whiteIce-50 p-2.5 text-slate-900 dark:border-whiteIce-800 dark:bg-whiteIce-600 dark:text-slate-100"
          >
            <FeatherIcon icon="search" />
          </Link>
          {(user.level === "admin" || user.level === "superuser") && (
            <Link
              to="admin"
              className="rounded-lg border-2 border-solid border-whiteIce-200 bg-whiteIce-50 p-2.5 text-slate-900 dark:border-whiteIce-800 dark:bg-whiteIce-600 dark:text-slate-100"
            >
              <FeatherIcon icon="settings" />
            </Link>
          )}
        </div>
      </div>
      <nav className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 bg-whiteIce-700 px-10 py-2 text-sm dark:bg-whiteIce-900">
        {LinkList.map((l, i) => (
          <Link to={l.path} className="flex items-center gap-1.5" key={i}>
            <FeatherIcon icon={l.icon} size="18" />
            {l.name}
          </Link>
        ))}
        {(user.level === "admin" || user.level === "superuser") && (
          <Link to="/admin" className="flex items-center gap-1.5">
            <FeatherIcon icon="settings" size="18" />
            Admin dashboard
          </Link>
        )}
      </nav>
    </header>
  );
}

export default TheHeader;
