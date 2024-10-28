import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultValue: string;
  onSearch?: (query: string) => void;
}

function TheSearchBar({ defaultValue, onSearch }: Props) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (onSearch) {
      onSearch(value);
    } else {
      navigate("/search");
    }
  }

  return (
    <form
      className="mx-auto flex w-[55em] max-w-full items-center justify-center gap-3"
      onSubmit={search}
    >
      <div className="flex flex-1 overflow-hidden rounded-lg border border-slate-400">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <FeatherIcon icon="search" size="18" />
          <input
            placeholder="Search for…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow"
          />
        </div>
        <select className="mr-1 border-l border-l-slate-400 bg-boxBg py-1 pl-3 pr-1.5">
          <option>Everything</option>
          <option>Title</option>
          <option>Abstract</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-400">
        <select className="mr-1 bg-boxBg py-1 pl-3 pr-1.5">
          <option>All languages</option>
          <option>English</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg border border-slate-400 px-3 py-1"
      >
        Submit
      </button>
    </form>
  );
}

export default TheSearchBar;
