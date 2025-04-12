import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function MergedPRsPerProjectView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "name", label: "Projekt"},
    { key: "mergedCount", label: "Gemergte PRs"}
  ];
  const viewTitle = "Gemergte Pull Requests pro Projekt";
  const viewDescription = "Übersicht über alle von Open Elements erstellten und erfolgreich gemergten Pull Requests pro Projekt.";

  const openDataApiClient = new OpenDataApiClient();

  useEffect(() => {
    openDataApiClient.getMergedPullRequestsPerProject()
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
