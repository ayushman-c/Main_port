/**
 * Format an ISO date string into a human-readable form.
 * @param {string} isoString
 * @param {Intl.DateTimeFormatOptions} [opts]
 */
export function formatDate(isoString, opts = { year: 'numeric', month: 'long' }) {
  return new Intl.DateTimeFormat('en-US', opts).format(new Date(isoString))
}

/**
 * Returns the relative time from now (e.g. "3 days ago").
 * @param {string} isoString
 */
export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const rtf  = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR   = 60 * MINUTE
  const DAY    = 24 * HOUR
  const WEEK   = 7  * DAY
  const MONTH  = 30 * DAY
  const YEAR   = 365 * DAY

  if (diff < MINUTE)  return rtf.format(-Math.round(diff / SECOND), 'second')
  if (diff < HOUR)    return rtf.format(-Math.round(diff / MINUTE), 'minute')
  if (diff < DAY)     return rtf.format(-Math.round(diff / HOUR),   'hour')
  if (diff < WEEK)    return rtf.format(-Math.round(diff / DAY),    'day')
  if (diff < MONTH)   return rtf.format(-Math.round(diff / WEEK),   'week')
  if (diff < YEAR)    return rtf.format(-Math.round(diff / MONTH),  'month')
  return rtf.format(-Math.round(diff / YEAR), 'year')
}
