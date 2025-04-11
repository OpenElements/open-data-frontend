import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import EmployeesView from "./views/EmployeesView.jsx";
import ProjectsView from "./views/ProjectsView.jsx";
import RepositoriesView from "./views/RepositoriesView.jsx";
import PullRequestsView from "./views/PullRequestsView.jsx";
import MergedPRsPerProjectView from "./views/MergedPRsPerProjectView.jsx";
import NavItem from "./components/NavItem.jsx";

export default function App() {
  return (
      <Router>
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Open Data Übersicht</h1>

          <nav className="flex space-x-4 mb-6">
            <NavItem label="Start" to="/" />

            <NavItem
                label="Allgemein"
                items={[
                  { to: "/employees", label: "Mitarbeitende" },
                  { to: "/projects", label: "Projekte" },
                ]}
            />

            <NavItem
                label="GitHub"
                items={[
                  { to: "/repositories", label: "Repositories" },
                  { to: "/pullrequests", label: "Pull Requests" },
                  { to: "/prs-by-project", label: "Merged PRs pro Projekt" },
                ]}
            />
          </nav>

          <Routes>
            <Route path="/employees" element={<EmployeesView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/repositories" element={<RepositoriesView />} />
            <Route path="/pullrequests" element={<PullRequestsView />} />
            <Route path="/prs-by-project" element={<MergedPRsPerProjectView />} />
            <Route path="*" element={<EmployeesView />} />
          </Routes>
        </div>
      </Router>
  );
}