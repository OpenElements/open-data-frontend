import { useEffect, useState } from "react";
import SortableTable from "./SortableTable";

export default function ProjectsTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Projekte</h2>
      <SortableTable
        data={data}
        columns={[
          { key: "name", label: "Name" },
          { key: "description", label: "Beschreibung" },
          { key: "matchingRepos", label: "Repos" }
        ]}
      />
    </div>
  );
}