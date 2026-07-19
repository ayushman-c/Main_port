import { Router } from 'express'
import { body } from 'express-validator'
import { handleContact } from '../controllers/contactController.js'
import { validate }       from '../middleware/validate.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post(
  '/',
  contactLimiter,
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required.')
      .isLength({ max: 100 }).withMessage('Name is too long.'),
    body('email')
      .trim()
      .isEmail().withMessage('A valid email is required.')
      .normalizeEmail(),
    body('message')
      .trim()
      .notEmpty().withMessage('Message is required.')
      .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters.'),
  ],
  validate,
  handleContact
)

export default router
