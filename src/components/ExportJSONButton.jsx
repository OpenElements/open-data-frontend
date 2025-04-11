import { saveAs } from "file-saver";

export default function ExportJSONButton({ data, filename = "export.json", label = "Als JSON exportieren" }) {
  const handleClick = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, filename);
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