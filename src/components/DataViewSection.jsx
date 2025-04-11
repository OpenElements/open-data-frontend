import ExportCSVButton from "./ExportCSVButton";
import ExportJSONButton from "./ExportJSONButton";
import SortableTable from "./SortableTable";

export default function DataViewSection({ title, description, data, columns }) {
  const csvColumns = columns.filter(col => col.csv);
  const tableColumns = columns.filter(col => col.table);

  return (
      <div className="mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
        </div>
        <div className="mb-8 max-w-6xl mx-auto">
          <div className="flex justify-end space-x-2 mb-4">
            <ExportCSVButton data={data} columns={csvColumns} />
            <ExportJSONButton data={data} />
          </div>
          <SortableTable data={data} columns={tableColumns} />
        </div>
      </div>
  );
}