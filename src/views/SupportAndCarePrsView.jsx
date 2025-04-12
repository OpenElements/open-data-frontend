import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function SupportAndCarePrsView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "title", label: "Titel", table: true, csv: true  },
    {
      key: "lastUpdateInGitHub",
      label: "Erstellt",
      format: (val) => new Date(val).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }), table: true, csv: true
    },
    {
      key: "merged",
      label: "Gemergt",
      format: (val) => val ? "✅" : ""
      , table: true, csv: true
    },
    { key: "link", label: "Link", table: true, csv: true, format: (val) => (
          <a
              href={val}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
          >
            Link öffnen
          </a>
      )  }
  ];
  const viewTitle = "Alle Pull Requests von Support & Care";
  const viewDescription = "Übersicht über alle von Open Elements erstellten Pull Requests für das Support & Care Projekt.";

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
