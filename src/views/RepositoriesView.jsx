import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function RepositoriesView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "org", label: "Organisation"},
    { key: "repository", label: "Repository"}
  ];
  const viewTitle = "Repositories";
  const viewDescription = "Alle GitHub Repositories, an denen Open Elements bisher Contributions (in Form von Pull Requests) geleistet hat.";

  const openDataApiClient = new OpenDataApiClient();
  useEffect(() => {
    openDataApiClient.getRepositories()
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
