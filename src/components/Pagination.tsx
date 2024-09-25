interface Props {
  totalPages: number;
  currentPage: number;
  onPageSelected?: (newPage: number) => void;
}

function Pagination({ totalPages, currentPage, onPageSelected }: Props) {
  const selectPage = (page: number) => {
    if (onPageSelected) {
      onPageSelected(page)
    }
  }

  return (
    <div className="rounded-lg bg-boxBg hover-grey px-2 flex">
      {currentPage > 1 && (
        <a href="#" className="py-1.5 px-2" onClick={() => {selectPage(1)}}>{1}</a>
      )}
      {(currentPage - 1) > 2 && (
        <span className="py-1.5 px-1">…</span>
      )}
      {(currentPage - 1) > 1 && (
        <a href="#" className="py-1.5 px-2" onClick={() => {selectPage(currentPage - 1)}}>{currentPage - 1}</a>
      )}
      <span className="py-1.5 px-2 font-semibold">{currentPage}</span>
      {(currentPage + 1) < totalPages && (
        <a href="#" className="py-1.5 px-2" onClick={() => {selectPage(currentPage + 1)}}>{currentPage + 1}</a>
      )}
      {(currentPage + 1) < (totalPages - 1) && (
        <span className="py-1.5 px-1">…</span>
      )}
      {currentPage < totalPages && (
        <a href="#" className="py-1.5 px-2" onClick={() => {selectPage(totalPages)}}>{totalPages}</a>
      )}
    </div>
  );
}

export default Pagination;
