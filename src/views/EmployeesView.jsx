import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function EmployeesView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "firstName", label: "Vorname"},
    { key: "lastName", label: "Nachname"},
    { key: "role", label: "Rolle"},
    { key: "gitHubUsername", label: "GitHub"},
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