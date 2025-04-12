import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function ProjectsView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "name", label: "Name"},
    { key: "description", label: "Beschreibung"}
  ];
  const viewTitle = "Projekte";
  const viewDescription = "Open Source Projekte an denen Open Elements beteiligt ist.";


  const openDataApiClient = new OpenDataApiClient();

  useEffect(() => {
    openDataApiClient.getProjects()
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