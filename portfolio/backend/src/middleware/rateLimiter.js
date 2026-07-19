import { rateLimit } from 'express-rate-limit'

/** Stricter limiter for the contact form (5 requests per 15 min). */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

/** GitHub proxy limiter — 30 requests per minute. */
export const githubLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many GitHub requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
