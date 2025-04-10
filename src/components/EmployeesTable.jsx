import { useEffect, useState } from "react";
import SortableTable from "./SortableTable";

export default function EmployeesTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Employees</h2>
      <SortableTable
        data={data}
        columns={[
          { key: "firstName", label: "Vorname" },
          { key: "lastName", label: "Nachname" },
          { key: "role", label: "Rolle" },
          { key: "gitHubUsername", label: "GitHub" },
        ]}
      />
    </div>
  );
}