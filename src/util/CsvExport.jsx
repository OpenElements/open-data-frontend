import { saveAs } from "file-saver";

export function exportCSV({ data, columns, filename = "export.csv" }) {
  if (!data || !columns || data.length === 0) return;

  const header = columns.map(col => col.label ?? col.key);
  const rows = data.map(row => columns.map(col => row[col.key]));

  const csv = [header, ...rows]
  .map(row => row.map(cell => `"${(cell ?? "").toString().replace(/"/g, '""')}"`).join(","))
  .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}