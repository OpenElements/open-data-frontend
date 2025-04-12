import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";
import {
  formatDateTime,
  formatMerged,
  formatLink,
  formatPrStatus
} from "../util/Formatters.jsx";

export default function SupportAndCarePrsView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "title", label: "Titel"},
    { key: "lastUpdateInGitHub",label: "Letzte Update", tableFormat: formatDateTime},
    { key: "state", label: "Status", tableFormat: formatPrStatus},
    { key: "link", label: "Link", tableFormat: formatLink }
  ];
  const viewTitle = "Alle Pull Requests von Support & Care";
  const viewDescription = "Übersicht über alle von Open Elements erstellten Pull Requests für das Support & Care Projekt (nach 01.12.2024).";

  const openDataApiClient = new OpenDataApiClient();

  useEffect(() => {
    openDataApiClient.getSupportAndCarePullRequests()
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
