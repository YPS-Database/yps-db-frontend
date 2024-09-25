import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultValue: string;
}

function TheSearchBar({defaultValue}: Props) {
  const [value, setValue] = useState(defaultValue)
  const navigate = useNavigate();

  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate('/search');
  }

  return (
    <form className="flex justify-center items-center gap-3 w-[55em] max-w-full mx-auto" onSubmit={search}>
      <div className="rounded-lg border border-slate-400 overflow-hidden flex flex-1">
        <div className="flex gap-2 items-center pl-2 flex-1">
          <FeatherIcon icon="search" size="18" />
          <input placeholder="Search for…" value={value} onChange={(e) => setValue(e.target.value)} className="flex-grow" />
        </div>
        <select className="bg-none pl-3 pr-1.5 py-1 border-l-slate-400 border-l bg-boxBg mr-1">
          <option>Everything</option>
          <option>Title</option>
          <option>Abstract</option>
        </select>
      </div>
      <div className="rounded-lg border border-slate-400 overflow-hidden">
          <select className="bg-none pl-3 pr-1.5 py-1 bg-boxBg mr-1">
            <option>All languages</option>
            <option>English</option>
            <option>French</option>
            <option>German</option>
          </select></div>
      <button type="submit" className="rounded-lg border border-slate-400 py-1 px-3">Submit</button>
    </form>
  );
}

export default TheSearchBar;
