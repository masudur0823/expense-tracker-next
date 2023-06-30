import React, { useEffect, useState } from "react";
import Pagination from "../pagiantion/Pagination";

function Table({ columns, data }) {
  const [page, setPage] = useState(data);
  useEffect(() => {
    setPage(data.slice(0,10))
  }, [data])
  
  console.log(page)
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
                        ? column.render(row[column.key],row)
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
    <Pagination setPage={setPage} data={data}/>
    </>
  );
}

export default Table;
