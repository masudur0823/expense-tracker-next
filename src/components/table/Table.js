import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Table({ columns, data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 10; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const page = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <div className="my-4 w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-400 ">
              {columns?.map((column, index) => (
                <th className="border p-1" key={index}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="border p-1 text-center">
                  No data found
                </td>
              </tr>
            ) : (
              <>
                {page.map((row) => (
                  <tr key={row?.id}>
                    {columns.map((column) => (
                      <td className="border p-1">
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center md:justify-between items-center mt-5 md:mt-10 flex-wrap gap-3">
        {data?.length === 0 ? (
          "Showing 0 from 0"
        ) : (
          <p>
            Showing{" "}
            {currentPage === pageCount - 1
              ? currentPage * itemsPerPage + page.length
              : offset + itemsPerPage}{" "}
            from {data?.length}
          </p>
        )}

        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5} // Number of page links to display
          marginPagesDisplayed={2} // Number of page links to display at the beginning and end
          onPageChange={handlePageChange} // Callback function for page change
          containerClassName="pagination flex gap-2 md:gap-3 md:items-center font-semibold flex-wrap"
          activeClassName="active"
          previousLabel={
            <>
              {"< "}
              <span className="hidden md:inline">Prev</span>
            </>
          }
          nextLabel={
            <>
              <span className="hidden md:inline">Next</span>
              {" >"}
            </>
          }
          pageLinkClassName="py-1 md:py-2 px-2 md:px-4 text-white text-xs md:text-sm bg-slate-600 rounded-lg"
          activeLinkClassName="!bg-orange-400"
          previousClassName="border border-orange-400 bg-orange-400 py-1 md:py-2 px-2 md:px-4 rounded-lg text-white text-xs md:text-sm"
          nextClassName="border border-orange-400 bg-orange-400 py-1 md:py-2 px-2 md:px-4 rounded-lg text-white text-xs md:text-sm"
          disabledClassName="opacity-50 bg-white !text-black !border-slate-400"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default Table;
