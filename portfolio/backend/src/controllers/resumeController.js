import { logger } from '../utils/logger.js'

// In-memory counter (resets on server restart — replace with DB for persistence)
let downloadCount = 0
const downloads = []

/**
 * POST /api/resume/download
 * Track a resume download event.
 */
export function trackDownload(req, res) {
  downloadCount++
  const event = {
    timestamp: new Date().toISOString(),
    ip:        req.ip,
    userAgent: req.headers['user-agent'] ?? 'unknown',
    referer:   req.headers.referer ?? 'direct',
  }
  downloads.push(event)
  logger.info(`Resume downloaded (#${downloadCount})`, { ip: req.ip })
  res.json({ success: true, count: downloadCount })
}

/**
 * GET /api/resume/downloads
 * Admin view — only accessible with a secret header.
 */
export function getDownloadCount(req, res) {
  const secret = process.env.ADMIN_SECRET
  if (!secret || req.headers['x-admin-secret'] !== secret) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  res.json({ count: downloadCount, events: downloads })
}
