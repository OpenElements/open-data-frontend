import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";
import {formatLink} from "../util/Formatters.jsx";

export default function OrganizationView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "name", label: "Name"},
    { key: "legalName", label: "Rechlicher Name"},
    { key: "streetAddress", label: "Strasse"},
    { key: "postalCode", label: "Postleitzahl"},
    { key: "city", label: "Stadt"},
    { key: "country", label: "Land"},
    { key: "email", label: "E-Mail-Adresse"},
    { key: "telephone", label: "Telefonnummer"},
    { key: "founder", label: "Gründer"},
    { key: "registerNumber", label: "Registernummer"},
    { key: "registerCourt", label: "Handelsregister"},
    { key: "vatNumber", label: "Umsatzsteuer-ID"},
    { key: "url", label: "Webseite", tableFormat: formatLink }
  ];
  const viewTitle = "Organisation";
  const viewDescription = "Alle Informationen zu Open Elements.";

  const openDataApiClient = new OpenDataApiClient();
  useEffect(() => {
    openDataApiClient.getOrganizations()
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