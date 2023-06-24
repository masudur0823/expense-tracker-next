import React from "react";

function Table({ columns, data }) {
  return (
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
              {data.map((row) => (
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
  );
}

export default Table;
