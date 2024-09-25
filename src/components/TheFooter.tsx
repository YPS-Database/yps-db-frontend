import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import GriffithLogo from '../assets/griffith-logo.png';

import { LinkList } from "../app/internalLinks";

function TheFooter() {
  return (
    <>
      <footer className="bg-rustyRed-700 text-slate-100 px-10 py-6 flex items-center justify-between">
        <div className="text-sm flex gap-1 flex-col">
          {LinkList.map((l) => (
            <Link to={l.path} className="flex gap-1.5 items-center">
              <FeatherIcon icon={l.icon} size="18" />
              {l.name}
            </Link>
          ))}
        </div>
        <div className="flex text-sm gap-1 flex-col text-center">
          <p>Presented by Dr Helen Berents</p>
          <p>Web design and hosting // Daniel Oakley</p>
        </div>
        <div className="flex text-sm gap-1 flex-col">
          <img src={GriffithLogo} className="h-16"/>
        </div>
      </footer>
    </>
  );
}

export default TheFooter;
