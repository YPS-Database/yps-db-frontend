import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import logo from "../assets/logo.png";
import { LinkList } from "../app/internalLinks";

function TheHeader() {
  return (
    <header className="sticky top-0">
      <div className="flex items-center justify-between bg-whiteIce-100 px-10 py-1 dark:bg-whiteIce-700">
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <img src={logo} alt="YPS Database logo" className="h-14" />
        </Link>
        <div className="flex gap-2 text-slate-900 dark:text-slate-100">
          <button className="bg-whiteIce-50 p-2.5 rounded-lg border-whiteIce-200 border-solid border-2 dark:bg-whiteIce-600 dark:border-whiteIce-800">
            <FeatherIcon icon="sun" />
          </button>
          <Link
            to="/"
            className="bg-whiteIce-50 text-slate-900 dark:text-slate-100 p-2.5 rounded-lg border-whiteIce-200 border-solid border-2 dark:bg-whiteIce-600 dark:border-whiteIce-800"
          >
            <FeatherIcon icon="search" />
          </Link>
        </div>
      </div>
      <nav className="flex items-center justify-start bg-whiteIce-700 px-10 py-2 gap-6 text-sm dark:bg-whiteIce-900">
        {LinkList.map((l, i) => (
          <Link to={l.path} className="flex gap-1.5 items-center" key={i}>
            <FeatherIcon icon={l.icon} size="18" />
            {l.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default TheHeader;
