export default async function fetchCommitDetails(repoUrl, sha) {
  try {
    const parts = repoUrl.split("github.com/")[1]
    if (!parts) throw new Error("Invalid GitHub URL")
    const [owner, repo] = parts.split("/")

    const commitRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`
    );
    if (!commitRes.ok) throw new Error("Failed to fetch commit details")

    const commitData = await commitRes.json()

    return {
      sha: commitData.sha,
      message: commitData.commit.message,
      author: commitData.commit.author,
      committer: commitData.commit.committer,
      stats: commitData.stats,
      files: commitData.files.map((f) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
        changes: f.changes,
        patch: f.patch,
      })),
    };
  } catch (error) {
    console.error("Error fetching commit details:", error)
    return null
  }
}
