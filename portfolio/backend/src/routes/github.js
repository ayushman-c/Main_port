import { Router } from 'express'
import { listRepos, getRepoDetail, getStats } from '../controllers/githubController.js'
import { githubLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.use(githubLimiter)

router.get('/stats',       getStats)
router.get('/repos',       listRepos)
router.get('/repos/:repo', getRepoDetail)

export default router
