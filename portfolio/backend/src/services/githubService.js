import axios from 'axios'
import NodeCache from 'node-cache'
import { logger } from '../utils/logger.js'

// Cache GitHub responses for 5 minutes to stay under API rate limits
const cache = new NodeCache({ stdTTL: 300 })

const ghApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  },
})

const USERNAME = () => process.env.GITHUB_USERNAME || 'ayushman-c'

/**
 * Fetch public repositories sorted by last push.
 */
export async function getPublicRepos() {
  const username = USERNAME()
  const cacheKey = `repos:${username}`

  const cached = cache.get(cacheKey)
  if (cached) {
    logger.debug('GitHub repos served from cache')
    return cached
  }

  const { data } = await ghApi.get(`/users/${username}/repos`, {
    params: { sort: 'pushed', per_page: 30, type: 'public' },
  })

  cache.set(cacheKey, data)
  return data
}

/**
 * Fetch a single repository.
 */
export async function getRepo(repo) {
  const username = USERNAME()
  const cacheKey = `repo:${username}/${repo}`

  const cached = cache.get(cacheKey)
  if (cached) return cached

  const { data } = await ghApi.get(`/repos/${username}/${repo}`)
  cache.set(cacheKey, data)
  return data
}

/**
 * Fetch GitHub user profile stats — repos, followers, total stars.
 */
export async function getUserStats() {
  const username = USERNAME()
  const cacheKey = `stats:${username}`

  const cached = cache.get(cacheKey)
  if (cached) return cached

  const [userRes, reposRes] = await Promise.all([
    ghApi.get(`/users/${username}`),
    ghApi.get(`/users/${username}/repos`, {
      params: { per_page: 100, type: 'public' },
    }),
  ])

  const user  = userRes.data
  const repos = reposRes.data

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  const stats = {
    publicRepos: user.public_repos,
    followers:   user.followers,
    following:   user.following,
    totalStars,
    avatarUrl:   user.avatar_url,
    bio:         user.bio,
    name:        user.name,
    createdAt:   user.created_at,
  }

  cache.set(cacheKey, stats)
  return stats
}
