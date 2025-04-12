
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


  async getSupportAndCarePullRequests() {
    const prsPromise = this.getPullRequests();
    const projectsPromise = this.getProjects();

    const SPECIAL_PROJECT_UUIDS = [
      "Project-support-and-care",
      "Project-maven",
      "Project-maven-plugins",
    ];

    return Promise.all([prsPromise, projectsPromise]).then(([prs, projects]) => {
      const filteredProjects = projects.filter((project) =>
          SPECIAL_PROJECT_UUIDS.includes(project.uuid)
      );

      return Promise.all([prsPromise, projectsPromise]).then(([prs, projects]) => {
        const relevantProjects = projects.filter((project) =>
            SPECIAL_PROJECT_NAMES.includes(project.name)
        );

        const relevantPatterns = relevantProjects
        .flatMap((project) => project.matchingRepos || []);

        const filteredPRs = prs.filter(
            (pr) =>
                pr.merged === true &&
                relevantPatterns.some((pattern) => matchesPR(pattern, pr))
        );

        return filteredPRs.map((pr) => ({
          title: pr.title,
              lastUpdateInGitHub: pr.lastUpdateInGitHub,
              merged: pr.merged,
          link: `https://github.com/${pr.org}/${pr.repository}/pull/${pr.gitHubId}`
        }));
      });
    });
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

  async getOrganizations() {
    return this.getJson("organizations");
  }

}