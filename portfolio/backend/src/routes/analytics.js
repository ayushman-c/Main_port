import { Router } from 'express'
import { trackVisit, getAnalytics } from '../controllers/analyticsController.js'
import { rateLimit } from 'express-rate-limit'

const router = Router()

const visitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many requests.' },
})

router.post('/visit',  visitLimiter, trackVisit)
router.get('/',        getAnalytics)

export default router
