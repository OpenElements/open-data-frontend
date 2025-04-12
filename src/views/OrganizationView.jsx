import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient.jsx";
import DataViewSection from "../components/DataViewSection.jsx";

export default function OrganizationView() {
  const [data, setData] = useState([]);

  const columns = [
    { key: "name", label: "Name", table: true, csv: true },
    { key: "legalName", label: "Rechlicher Name", table: true, csv: true },
    { key: "streetAddress", label: "Strasse", table: true, csv: false },
    { key: "postalCode", label: "Postleitzahl", table: true, csv: false },
    { key: "city", label: "Stadt", table: true, csv: false },
    { key: "country", label: "Land", table: true, csv: false },
    { key: "email", label: "E-Mail-Adresse", table: true, csv: false },
    { key: "telephone", label: "Telefonnummer", table: true, csv: false },
    { key: "founder", label: "Gründer", table: true, csv: false },
    { key: "registerNumber", label: "Registernummer", table: true, csv: false },
    { key: "registerCourt", label: "Handelsregister", table: true, csv: false },
    { key: "vatNumber", label: "Umsatzsteuer-ID", table: true, csv: false },
    { key: "url", label: "Webseite", table: true, csv: false }
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