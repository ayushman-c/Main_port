import { getPublicRepos, getRepo, getUserStats } from '../services/githubService.js'
import { logger } from '../utils/logger.js'

/**
 * GET /api/github/repos
 */
export async function listRepos(req, res) {
  try {
    const repos = await getPublicRepos()
    res.json(repos)
  } catch (err) {
    logger.error('GitHub listRepos error', { error: err.message })
    res.status(502).json({ error: 'Could not fetch repositories.' })
  }
}

/**
 * GET /api/github/repos/:repo
 */
export async function getRepoDetail(req, res) {
  try {
    const repo = await getRepo(req.params.repo)
    res.json(repo)
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Repository not found.' })
    }
    logger.error('GitHub getRepoDetail error', { error: err.message })
    res.status(502).json({ error: 'Could not fetch repository.' })
  }
}

/**
 * GET /api/github/stats
 */
export async function getStats(req, res) {
  try {
    const stats = await getUserStats()
    res.json(stats)
  } catch (err) {
    logger.error('GitHub getStats error', { error: err.message })
    res.status(502).json({ error: 'Could not fetch GitHub stats.' })
  }
}
