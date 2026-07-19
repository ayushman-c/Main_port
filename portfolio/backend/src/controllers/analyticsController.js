import { logger } from '../utils/logger.js'

// In-memory analytics (replace with DB for production persistence)
let visitorCount = 0
const visits = []

/**
 * POST /api/analytics/visit
 * Log a page visit.
 */
export function trackVisit(req, res) {
  visitorCount++
  const visit = {
    timestamp: new Date().toISOString(),
    page:      req.body?.page ?? '/',
    referrer:  req.headers.referer ?? 'direct',
    userAgent: req.headers['user-agent'] ?? 'unknown',
  }
  visits.push(visit)

  // Keep only last 1000 visits in memory
  if (visits.length > 1000) visits.shift()

  logger.debug(`Visit tracked: ${visit.page}`)
  res.json({ success: true })
}

/**
 * GET /api/analytics
 * Admin analytics view.
 */
export function getAnalytics(req, res) {
  const secret = process.env.ADMIN_SECRET
  if (!secret || req.headers['x-admin-secret'] !== secret) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const pageViews = visits.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] ?? 0) + 1
    return acc
  }, {})

  res.json({
    totalVisits: visitorCount,
    uniquePages: Object.keys(pageViews).length,
    pageViews,
    recentVisits: visits.slice(-20),
  })
}
