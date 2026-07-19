import { Router } from 'express'
import { trackDownload, getDownloadCount } from '../controllers/resumeController.js'
import { rateLimit } from 'express-rate-limit'

const router = Router()

const downloadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests.' },
})

router.post('/download', downloadLimiter, trackDownload)
router.get('/downloads', getDownloadCount)  // protected by env check inside controller

export default router
