import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import GriffithLogo from "../assets/griffith-logo.png";

import { LinkList } from "../app/internalLinks";

function TheFooter() {
  return (
    <footer className="relative flex flex-col items-center justify-between gap-x-10 gap-y-6 bg-rustyRed-700 px-10 py-6 text-slate-100 sm:flex-row">
      <div className="z-10 flex flex-shrink-0 flex-col gap-1 text-sm">
        {LinkList.map((l, i) => (
          <Link to={l.path} className="flex items-center gap-1.5" key={i}>
            <FeatherIcon icon={l.icon} size="18" />
            {l.name}
          </Link>
        ))}
      </div>
      <div className="z-10 flex flex-col gap-2 text-balance text-center text-sm">
        <p>
          The YPS Database was created and is maintained on the unceded lands of
          the Turrbal, Jagera, and Quandamooka Peoples. We pay our respects to
          their Elders, past and present and thank them for their ongoing
          custodianship of Country. Sovereignty was never ceded; this always
          was, and always will be, Aboriginal land.
        </p>
        <a
          href="https://danieloaks.net/"
          target="_blank"
          className="text-white no-underline"
        >
          Web design and hosting // Daniel Oakley
        </a>
      </div>
      <div className="z-10 flex flex-shrink-0 flex-col gap-1 text-sm">
        <img src={GriffithLogo} className="h-16" />
      </div>
    </footer>
  );
}

export default TheFooter;
