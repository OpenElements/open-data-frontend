
function matchesPR(pattern, pr) {
  const full = `${pr.org}/${pr.repository}`;
  if (pattern.endsWith("/*")) {
    const org = pattern.replace("/*", "");
    return pr.org === org;
  }
  return full === pattern;
}

export default class OpenDataApiClient {

  constructor(baseUrl) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL;
  }

  async getJson(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen von ${endpoint}: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[ApiClient] GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  async getMergedPullRequestsPerProject() {
   let prs = this.getPullRequests();
   let projects = this.getProjects();

    return Promise.all([prs, projects]).then(([prs, projects]) => {
      return projects.map((project) => {
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
    });
  }

  async getEmployees() {
    return this.getJson("employees");
  }

  async getPullRequests() {
    return this.getJson("pullrequests");
  }

  async getProjects() {
    return this.getJson("projects");
  }

  async getRepositories() {
    return this.getJson("repositories");
  }

}