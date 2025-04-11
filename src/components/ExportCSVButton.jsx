import { exportCSV } from "../util/CsvExport.jsx";

export default function ExportCSVButton({ data, columns, filename = "export.csv", label = "Als CSV exportieren" }) {
  const handleClick = () => {
    exportCSV({ data, columns, filename });
  };

  return (
      <button
          onClick={handleClick}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
      >
        {label}
      </button>
  );
}