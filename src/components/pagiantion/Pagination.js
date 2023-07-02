

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className='flex justify-end'>
      <button onClick={onPrevPage} disabled={currentPage === 1} className='border-2 px-4 py-2 rounded-xl text-white bg-slate-400'>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNextPage} disabled={currentPage === totalPages} className='border-2 px-4 py-2 rounded-xl text-white bg-slate-400'>
        Next
      </button>
    </div>
  );
};

export default Pagination;