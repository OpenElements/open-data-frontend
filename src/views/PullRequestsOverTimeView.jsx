import { useEffect, useState } from "react";
import OpenDataApiClient from "../util/OpenDataApiClient";
import ValuesOverTimeByMonthChart from "../components/ValuesOverTimeByMonthChart";
import { parseISO, format } from "date-fns";


function groupPRsByMonth(prs) {
  const grouped = {};

  prs.forEach((pr) => {
    const date = parseISO(pr.createdAtInGitHub);
    const key = format(date, "yyyy-MM"); // z. B. "2024-09"

    if (!grouped[key]) {
      grouped[key] = 0;
    }
    grouped[key]++;
  });

  return Object.entries(grouped).map(([month, count]) => ({
    month,
    count,
  }));
}

export default function PullRequestsOverTimeView() {
  const [data, setData] = useState([]);
  const viewTitle = "Pull Requests über die Zeit";
  const viewDescription = "Alle Pull Requests, die von Open Elements erstellt wurden zeitlich angeordnet.";

  useEffect(() => {
    const api = new OpenDataApiClient();
    api.getPullRequests()
    .then(groupPRsByMonth)
    .then(setData)
    .catch(console.error);
  }, []);

  return (
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-xl font-bold mb-2">{viewTitle}</h2>
        <p className="text-gray-600 mb-6">{viewDescription}</p>
        <ValuesOverTimeByMonthChart data={data} />
      </div>
  );
}