import { useEffect, useState } from "react";
import SortableTable from "./SortableTable";

function matchesPR(pattern, pr) {
  const full = `${pr.org}/${pr.repository}`;
  if (pattern.endsWith("/*")) {
    const org = pattern.replace("/*", "");
    return pr.org === org;
  }
  return full === pattern;
}


export default function MergedPRsPerProject() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;

    Promise.all([
      fetch(`${base}/projects`).then((res) => res.json()),
      fetch(`${base}/pullrequests`).then((res) => res.json()),
    ])
    .then(([projects, prs]) => {
      const result = projects.map((project) => {
        const matching = prs.filter(
            (pr) =>
                Array.isArray(project.matchingRepos) &&
                project.matchingRepos.some((pattern) => matchesPR(pattern, pr)) &&
                pr.merged === true
        );
        return {
          name: project.name,
          mergedCount: matching.length,
        };
      });
      setRows(result);
    })
    .catch(console.error);
  }, []);

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gemergte Pull Requests pro Projekt</h1>
        <SortableTable
            data={rows}
            columns={[
              { key: "name", label: "Projekt" },
              { key: "mergedCount", label: "Gemergte PRs" },
            ]}
        />
      </div>
  );
}
