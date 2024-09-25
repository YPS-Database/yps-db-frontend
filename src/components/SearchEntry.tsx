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
    <div className="rounded-lg bg-boxBg search-entry py-3.5 px-8 flex flex-col gap-1">
      <h2>{title}</h2>
      <div className="flex gap-8 text-sm items-baseline">
        <span>{year}</span>
        <span>{author}</span>
      </div>
      <div className="flex gap-8 text-sm items-baseline mt-1">
        <span>{entryType}</span>
        <span className="flex-1">{languages.join(", ")}</span>
        <Link to={`/item/${id}`}>See details</Link>
      </div>
    </div>
  );
}

export default SearchEntry;
