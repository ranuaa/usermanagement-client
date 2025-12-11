import React from "react";

export default function DataTable({ columns, rows, keyField = "id", emptyText = "No data" }) {
    console.log(rows)
    console.log(columns)
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={c.style} className={c.className}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((c) => (
                <td key={c.key} className ={c.tdClassName}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}

          {!rows?.length && (
            <tr>
              <td colSpan={columns.length} className="text-center text-muted py-4">
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
