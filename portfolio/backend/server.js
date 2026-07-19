import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'

import contactRouter   from './src/routes/contact.js'
import githubRouter    from './src/routes/github.js'
import resumeRouter    from './src/routes/resume.js'
import analyticsRouter from './src/routes/analytics.js'
import { logger }      from './src/utils/logger.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Security headers ──────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// ── CORS ──────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    logger.warn(`CORS blocked: ${origin}`)
    cb(new Error(`CORS: origin ${origin} not allowed`))
  },
  methods: ['GET', 'POST'],
  credentials: true,
}))

// ── Global rate limit ─────────────────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP. Please try again later.' },
}))

// ── Body parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))

// ── HTTP logging ──────────────────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
)

// ── Routes ────────────────────────────────────────────────────────────
app.use('/api/contact',   contactRouter)
app.use('/api/github',    githubRouter)
app.use('/api/resume',    resumeRouter)
app.use('/api/analytics', analyticsRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    env: process.env.NODE_ENV ?? 'development',
  })
})

// ── 404 ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ── Global error handler ──────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error(err.message, { stack: err.stack })

  // Handle CORS errors
  if (err.message?.startsWith('CORS:')) {
    return res.status(403).json({ error: 'Not allowed by CORS' })
  }

  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`🚀 Portfolio API running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`)
})
