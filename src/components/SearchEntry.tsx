import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  author: string;
  year: string;
  entryType: string;
  languages: string[];
  regions: string[];
}

function SearchEntry({ id, title, author, year, entryType, languages }: Props) {
  return (
    <div className="search-entry flex flex-col gap-1 rounded-lg bg-boxBg px-8 py-3.5">
      <h2>{title}</h2>
      <div className="flex items-baseline gap-8 text-sm">
        <span>{year}</span>
        <span>{author}</span>
      </div>
      <div className="mt-1 flex items-end gap-8 text-sm">
        <span className="max-w-[15rem]">{entryType}</span>
        <span className="flex-1 text-balance">{languages.join(", ")}</span>
        <Link to={`/entry/${id}`}>See details</Link>
      </div>
    </div>
  );
}

export default SearchEntry;
