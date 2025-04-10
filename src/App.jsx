import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import EmployeesTable from "./components/EmployeesTable";
import ProjectsTable from "./components/ProjectsTable";
import RepositoriesTable from "./components/RepositoriesTable";
import PullRequestsTable from "./components/PullRequestsTable";

export default function App() {
  return (
    <Router>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Open Data Übersicht</h1>

        <nav className="flex space-x-4 mb-6 border-b">
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `px-4 py-2 border-b-2 ${
                isActive ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-blue-600"
              }`
            }
          >
            Mitarbeitende
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-4 py-2 border-b-2 ${
                isActive ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-blue-600"
              }`
            }
          >
            Projekte
          </NavLink>
          <NavLink
            to="/repositories"
            className={({ isActive }) =>
              `px-4 py-2 border-b-2 ${
                isActive ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-blue-600"
              }`
            }
          >
            Repositories
          </NavLink>
          <NavLink
            to="/pullrequests"
            className={({ isActive }) =>
              `px-4 py-2 border-b-2 ${
                isActive ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-blue-600"
              }`
            }
          >
            Pull Requests
          </NavLink>
        </nav>

        <Routes>
          <Route path="/employees" element={<EmployeesTable />} />
          <Route path="/projects" element={<ProjectsTable />} />
          <Route path="/repositories" element={<RepositoriesTable />} />
          <Route path="/pullrequests" element={<PullRequestsTable />} />
          <Route path="*" element={<EmployeesTable />} />
        </Routes>
      </div>
    </Router>
  );
}