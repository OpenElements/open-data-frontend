import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";
import {formatDateTime, formatMerged} from "../util/Formatters.jsx";

export default function PullRequestsView() {
  const [data, setData] = useState([]);

  const columns =[
    { key: "title", label: "Titel"},
    { key: "author", label: "Autor"},
    { key: "org", label: "Org"},
    { key: "repository", label: "Repo"},
    { key: "createdAtInGitHub", label: "Erstellt", tableFormat: formatDateTime},
    { key: "merged", label: "Gemergt", tableFormat: formatMerged},
    { key: "open", label: "Offen" }
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
