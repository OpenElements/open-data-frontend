import { useEffect, useState } from "react";
import SortableTable from "./SortableTable";

export default function RepositoriesTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/repositories`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Repositories</h2>
      <SortableTable
        data={data}
        columns={[
          { key: "org", label: "Organisation" },
          { key: "repository", label: "Repository" }
        ]}
      />
    </div>
  );
}
