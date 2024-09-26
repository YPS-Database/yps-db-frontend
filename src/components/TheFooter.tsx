import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import GriffithLogo from "../assets/griffith-logo.png";

import { LinkList } from "../app/internalLinks";

function TheFooter() {
  return (
    <footer className="relative flex items-center justify-between bg-rustyRed-700 px-10 py-6 text-slate-100">
      <div className="z-10 flex flex-col gap-1 text-sm">
        {LinkList.map((l, i) => (
          <Link to={l.path} className="flex items-center gap-1.5" key={i}>
            <FeatherIcon icon={l.icon} size="18" />
            {l.name}
          </Link>
        ))}
      </div>
      <div className="z-10 flex flex-col gap-1 text-center text-sm">
        <p>Presented by Dr Helen Berents</p>
        <p>Web design and hosting // Daniel Oakley</p>
      </div>
      <div className="z-10 flex flex-col gap-1 text-sm">
        <img src={GriffithLogo} className="h-16" />
      </div>
    </footer>
  );
}

export default TheFooter;
