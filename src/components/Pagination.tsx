interface Props {
  totalPages: number;
  currentPage: number;
  onPageSelected?: (newPage: number) => void;
}

function Pagination({ totalPages, currentPage, onPageSelected }: Props) {
  const selectPage = (page: number) => {
    if (onPageSelected) {
      onPageSelected(page);
    }
  };

  return (
    <div className="hover-grey flex rounded-lg bg-boxBg px-2">
      {currentPage > 1 && (
        <a
          href="#"
          className="px-2 py-1.5"
          onClick={(e) => {
            e.preventDefault();
            selectPage(1);
          }}
        >
          {1}
        </a>
      )}
      {currentPage - 1 > 2 && <span className="px-1 py-1.5">…</span>}
      {currentPage - 1 > 1 && (
        <a
          href="#"
          className="px-2 py-1.5"
          onClick={(e) => {
            e.preventDefault();
            selectPage(currentPage - 1);
          }}
        >
          {currentPage - 1}
        </a>
      )}
      <span className="px-2 py-1.5 font-semibold">{currentPage}</span>
      {currentPage + 1 < totalPages && (
        <a
          href="#"
          className="px-2 py-1.5"
          onClick={(e) => {
            e.preventDefault();
            selectPage(currentPage + 1);
          }}
        >
          {currentPage + 1}
        </a>
      )}
      {currentPage + 1 < totalPages - 1 && (
        <span className="px-1 py-1.5">…</span>
      )}
      {currentPage < totalPages && (
        <a
          href="#"
          className="px-2 py-1.5"
          onClick={(e) => {
            e.preventDefault();
            selectPage(totalPages);
          }}
        >
          {totalPages}
        </a>
      )}
    </div>
  );
}

export default Pagination;
