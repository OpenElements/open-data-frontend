import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function EmployeesView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "firstName", label: "Vorname", table: true, csv: true },
    { key: "lastName", label: "Nachname", table: true, csv: true },
    { key: "role", label: "Rolle", table: true, csv: false },
    { key: "gitHubUsername", label: "GitHub", table: true, csv: false },
  ];
  const viewTitle = "Mitarbeiter";
  const viewDescription = "Alle Mitarbeiter von Open Elements.";

  const openDataApiClient = new OpenDataApiClient();
  useEffect(() => {
    openDataApiClient.getEmployees()
    .then(setData)
    .catch(console.error);
  }, []);

  return (
      <DataViewSection
          title={viewTitle}
          description={viewDescription}
          data={data}
          columns={columns}
      />
  );
}