import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SortableTable({ data, columns = null }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (!data || data.length === 0) return <p className="text-gray-500">Keine Daten</p>;

  const keys = columns ? columns.map(c => c.key) : Object.keys(data[0]);

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
    if (typeof aVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortOrder === "asc"
      ? aVal.toString().localeCompare(bVal)
      : bVal.toString().localeCompare(aVal);
  });

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
        <tr>
          {keys.map((key) => {
            const col = columns?.find(c => c.key === key);
            const label = col?.label ?? key;
            const isSorted = sortKey === key;

            return (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200 select-none"
              >
                <div className="flex items-center gap-1">
                  {label}
                  {isSorted &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
            );
          })}
        </tr>
        </thead>
        <tbody>
        {sorted.map((item, idx) => (
          <tr key={idx} className="even:bg-gray-50 hover:bg-blue-50 transition">
            {keys.map((key) => {
              const col = columns?.find(c => c.key === key);
              const value = item[key];
              const content = col?.tableFormat
                ? col.tableFormat(value, item)
                : Array.isArray(value)
                  ? value.join(", ")
                  : value?.toString() ?? "-";

              return (
                <td key={key} className="px-4 py-2 text-sm text-gray-800">
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}