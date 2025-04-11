import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function PullRequestsView() {
  const [data, setData] = useState([]);

  const columns =[
    { key: "title", label: "Titel", table: true, csv: true  },
    { key: "author", label: "Autor", table: true, csv: true  },
    { key: "org", label: "Org", table: true, csv: true  },
    { key: "repository", label: "Repo", table: true, csv: true  },
    {
      key: "createdAtInGitHub",
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
    { key: "open", label: "Offen", table: true, csv: true  }
  ];
  const viewTitle = "Pull Requests";
  const viewDescription = "Alle Pull Requests, die Open Elements erstellt hat.";

  const openDataApiClient = new OpenDataApiClient();

  useEffect(() => {
    openDataApiClient.getPullRequests()
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
