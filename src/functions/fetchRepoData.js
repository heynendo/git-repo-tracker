export default async function fetchRepoData(repoUrl, limit = 10) {
  try {
    const parts = repoUrl.split("github.com/")[1]
    if (!parts) throw new Error("Invalid GitHub URL")
    const [owner, repo] = parts.split("/")

    // Get all branches
    const branchesRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/branches`
    );
    if (!branchesRes.ok) throw new Error("Failed to fetch branches")
    const branchesData = await branchesRes.json()

    // Capture API rate limit headers
     const resetTimestamp = branchesRes.headers.get("X-RateLimit-Reset")
    const rateLimit = {
      remaining: branchesRes.headers.get("X-RateLimit-Remaining"),
      limit: branchesRes.headers.get("X-RateLimit-Limit"),
      reset: resetTimestamp
        ? new Date(parseInt(resetTimestamp, 10) * 1000).toLocaleTimeString()
        : null,
    };

    // Take only `limit` branches
    const branchNames = branchesData.map((b) => b.name).slice(0, limit)

    // Fetch commits for each branch
    const commitsPromises = branchNames.map(async (branch) => {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=100`
      )

      // Update rate limit info from last request
      rateLimit.remaining = commitsRes.headers.get("X-RateLimit-Remaining")
      rateLimit.limit = commitsRes.headers.get("X-RateLimit-Limit")

      if (!commitsRes.ok) return { branch, commits: [] }
      const commitsData = await commitsRes.json()
      return {
        branch,
        commits: commitsData.map((c) => ({
          sha: c.sha,
          message: c.commit.message,
          author: c.commit.author.name,
          date: c.commit.author.date,
          url: c.html_url,
        })),
      }
    })

    const allCommits = await Promise.all(commitsPromises)

    return { branches: branchNames, commits: allCommits, rateLimit }
  } catch (error) {
    console.error("Error fetching repo data:", error)
    return { branches: [], commits: [], rateLimit: { remaining: null, limit: null } }
  }
}