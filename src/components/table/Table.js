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

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5} // Number of page links to display
        marginPagesDisplayed={2} // Number of page links to display at the beginning and end
        onPageChange={handlePageChange} // Callback function for page change
        containerClassName="pagination flex gap-3 items-center font-semibold"
        activeClassName="active"
        previousLabel="< Prev"
        nextLabel="Next >"
        pageLinkClassName="py-2 px-4 text-white bg-slate-600 rounded-lg"
        previousClassName="border border-orange-400 bg-orange-400 py-2 px-4 rounded-lg text-white"
        nextClassName="border border-orange-400 bg-orange-400 py-2 px-4 rounded-lg text-white"
        disabledClassName="opacity-50 bg-white text-black"
      />
    </>
  );
}

export default Table;
