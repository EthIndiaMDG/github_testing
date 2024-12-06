import { Octokit } from "octokit";


interface UserDetails {
  login: string;
  id: number;
  avatar_url: string;
}

interface FileChange {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch?: string;
}

interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface CommitDetails {
  sha: string;
  author: CommitAuthor;
  message: string;
  userDetails?: UserDetails;
  commitDetails: any;
  fileChanges: FileChange[];
}

interface RepoCommitInfo {
  repoName: string;
  commits: CommitDetails[];
}

async function fetchOrganizationRepoCommitDetails(
  orgName: string, 
  token: string
): Promise<RepoCommitInfo[]> {
  const octokit = new Octokit({ auth: token });

  try {
    const reposResponse = await octokit.request(`GET /orgs/${orgName}/repos`, {
      org: orgName,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    });

    const repoCommitDetails: RepoCommitInfo[] = await Promise.all(
      reposResponse.data.map(async (repo: any) => {
        const commitsResponse = await octokit.request(`GET /repos/${orgName}/${repo.name}/commits`, {
          owner: orgName,
          repo: repo.name,
          headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        });

        const commits: CommitDetails[] = await Promise.all(
          commitsResponse.data.map(async (commit: any) => {
            let userDetails: UserDetails | undefined;
            let commitDetails: any = null;
            let fileChanges: FileChange[] = [];

            try {
              const userResponse = await octokit.request(`GET /users/${commit.author?.login}`, {
                username: commit.author?.login,
                headers: { 'X-GitHub-Api-Version': '2022-11-28' }
              });
              userDetails = {
                login: userResponse.data.login,
                id: userResponse.data.id,
                avatar_url: userResponse.data.avatar_url
              };
              const commitDetailResponse = await octokit.request(`GET /repos/${orgName}/${repo.name}/commits/${commit.sha}`, {
                owner: orgName,
                repo: repo.name,
                ref: commit.sha,
                headers: { 'X-GitHub-Api-Version': '2022-11-28' }
              });
              commitDetails = commitDetailResponse.data;
              fileChanges = commitDetailResponse.data.files.map((file: any) => ({
                filename: file.filename,
                status: file.status,
                additions: file.additions,
                deletions: file.deletions,
                patch: file.patch
              }));
            } catch (error) {
              userDetails = undefined;
              commitDetails = null;
              fileChanges = [];
            }

            return {
              sha: commit.sha,
              author: {
                name: commit.commit.author.name,
                email: commit.commit.author.email,
                date: commit.commit.author.date
              },
              message: commit.commit.message,
              userDetails: userDetails,
              commitDetails: commitDetails,
              fileChanges: fileChanges
            };
          })
        );

        return {
          repoName: repo.name,
          commits: commits
        };
      })
    );

    return repoCommitDetails;
  } catch (error) {
    console.error('Error fetching organization repository details:', error);
    throw error;
  }
}

export { fetchOrganizationRepoCommitDetails };