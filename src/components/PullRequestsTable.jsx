import { useEffect, useState } from "react";
import SortableTable from "./SortableTable";

export default function PullRequestsTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/pullrequests`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Pull Requests</h2>
      <SortableTable
        data={data}
        columns={[
          { key: "title", label: "Titel" },
          { key: "author", label: "Autor" },
          { key: "repository", label: "Repo" },
          {
            key: "createdAtInGitHub",
            label: "Erstellt",
            format: (val) => new Date(val).toLocaleString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          },
          {
            key: "merged",
            label: "Gemergt",
            format: (val) => val ? "✅" : ""
          },
          { key: "open", label: "Offen" }
        ]}
      />
    </div>
  );
}
